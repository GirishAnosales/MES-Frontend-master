import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';

@Component({
	selector: 'app-mes-create-group-dialog',
	templateUrl: './mes-create-group-dialog.component.html',
	styleUrls: ['./mes-create-group-dialog.component.scss']
})
export class MesCreateGroupDialogComponent implements OnInit, AfterContentChecked {

	createGroupForm!: FormGroup;

	// 	USERNAME
	username!: string;
	userId!: number;

	//	SNACKBAR
	durationInSeconds = 5;
	progressValue: number = 0;
	progressInterval: any;

	//	APIS
	private baseURL = "http://localhost:8080/api/group/createGroup";
	private getIdByUsername = "http://localhost:8080/api/user/id";

	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		public dialogRef: MatDialogRef<MesCreateGroupDialogComponent>,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
		private auth: AuthService,
	) {
		this.createGroupForm = this.fb.group({
			groupName: ['', [Validators.required]],
			groupDescription: ['', [Validators.required]],
			createdAt: new FormControl(new Date()), // Set initial value to current timestamp
			updatedAt: new FormControl(new Date()), // Set initial value to current timestamp
			canRead: [false, [Validators.required]],
			canCreateInstructions: [false, [Validators.required]],
			canEditInstructions: [false, [Validators.required]],
			canDeleteInstructions: [false, [Validators.required]],
			canCreateUser: [false, [Validators.required]],
			canEditUser: [false, [Validators.required]],
			canDeleteUser: [false, [Validators.required]],
			canCreateGroup: [false, [Validators.required]],
			canEditGroup: [false, [Validators.required]],
			canDeleteGroup: [false, [Validators.required]],
			accessBirthCertificate: [false, [Validators.required]],
		})
	}

	ngOnInit(): void {

	}

	ngAfterContentChecked(): void {
		this.username = this.auth.getCurrentUser();
	}

	get f() { return this.createGroupForm.controls; }
	get groupName() { return this.createGroupForm.get('groupName'); }
	get groupDescription() { return this.createGroupForm.get('groupDescription'); }
	get canRead() { return this.createGroupForm.get('canRead'); }
	get canCreateInstructions() { return this.createGroupForm.get('canCreateInstructions'); }
	get canEditInstructions() { return this.createGroupForm.get('canEditInstructions'); }
	get canDeleteInstructions() { return this.createGroupForm.get('canDeleteInstructions'); }
	get canCreateUser() { return this.createGroupForm.get('canCreateUser'); }
	get canEditUser() { return this.createGroupForm.get('canEditUser'); }
	get canDeleteUser() { return this.createGroupForm.get('canDeleteUser'); }
	get canCreateGroup() { return this.createGroupForm.get('canCreateGroup'); }
	get canEditGroup() { return this.createGroupForm.get('canEditGroup'); }
	get canDeleteGroup() { return this.createGroupForm.get('canDeleteGroup'); }
	get accessBirthCertificate() { return this.createGroupForm.get('accessBirthCertificate'); }

	createGroup() {
		if (this.createGroupForm.invalid) {
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

		const formData = this.createGroupForm.value;

		formData.groupName = formData.groupName.toUpperCase();
		formData.isDeleted = false;
		formData.createdByUserId = this.userId;

		this.http.post<any>(this.baseURL, formData).subscribe({
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
