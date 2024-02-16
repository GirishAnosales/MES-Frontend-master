import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';
import { MesCreateGroupDialogComponent } from '../mes-create-group-dialog/mes-create-group-dialog.component';

@Component({
	selector: 'app-mes-create-instruction-dialog',
	templateUrl: './mes-create-instruction-dialog.component.html',
	styleUrls: ['./mes-create-instruction-dialog.component.scss']
})
export class MesCreateInstructionDialogComponent {

	createProjectForm!: FormGroup;

	// 	USERNAME
	username!: string;
	userId!: number;

	//	SNACKBAR
	durationInSeconds = 5;
	progressValue: number = 0;
	progressInterval: any;

	//	APIS
	private api_createProject = "http://localhost:8080/api/project/createProject";
	private getIdByUsername = "http://localhost:8080/api/user/id";

	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		public dialogRef: MatDialogRef<MesCreateGroupDialogComponent>,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
		private auth: AuthService,
	) {
		this.createProjectForm = this.fb.group({
			projectName: ['', [Validators.required]],
			projectDescription: ['', [Validators.required]],
			createdAt: new FormControl(new Date()),
			updatedAt: new FormControl(new Date()),
		})
	}

	ngOnInit(): void {

	}

	ngAfterContentChecked(): void {
		this.username = this.auth.getCurrentUser();
	}

	get f() { return this.createProjectForm.controls; }
	get projectName() { return this.createProjectForm.get('projectName'); }
	get projectDescription() { return this.createProjectForm.get('projectDescription'); }

	createProject() {
		if (this.createProjectForm.invalid) {
			return;
		}

		this.getUserIdByUsername(this.username).subscribe({
			next: (response) => {
				this.userId = response
				console.log('Typeof: ', typeof (this.userId));
				console.log('User ID: ', this.userId);
			},
			error: (error) => {
				console.error('Error fetching user ID:', error);
			}
		});

		const formData = this.createProjectForm.value;
		formData.isDeleted = false;
		formData.createdByUserId = this.userId;

		this.http.post<any>(this.api_createProject, formData).subscribe({
			next: (response) => {
				console.log('Group Created:', response);
				this.positiveSnackbarService.openPositiveSnackbar("Creating Group!").afterDismissed().subscribe(() => {
					this.dialogRef.close();
					location.reload();
				});
			},
			error: (error) => {
				console.error('Group Not Created:', error);
				this.negativeSnackbarService.openNegativeSnackbar("Creating Group Failed!").afterDismissed().subscribe(() => {
					// location.reload();
				});
			}
		});

		console.log('Creating Group Form submitted:', formData);
	}

	// 	GET USER ID BY USERNAME
	getUserIdByUsername(username: string): Observable<number> {
		return this.http.get<number>(`${this.getIdByUsername}/${username}`);
	}

}
