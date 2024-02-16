import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';

@Component({
	selector: 'app-mes-create-user-dialog',
	templateUrl: './mes-create-user-dialog.component.html',
	styleUrls: ['./mes-create-user-dialog.component.scss']
})
export class MesCreateUserDialogComponent {

	createUserForm!: FormGroup;

	//	SNACKBAR
	durationInSeconds = 5;
	progressValue: number = 0;
	progressInterval: any;

	//	APIS
	private baseURL = "http://localhost:8080/api/user/createUser";

	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private http: HttpClient,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
		public dialogRef: MatDialogRef<MesCreateUserDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public groupName: string
	) {
		const currentUser = this.auth.getCurrentUser();

		this.createUserForm = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
			badgeNumber: ['', [Validators.required]],
			isApprover: [false, [Validators.required]],
			createdAt: new FormControl(new Date()),
			updatedAt: new FormControl(new Date()),
			groupName: [this.groupName],
			createdBy: [currentUser],
			isDeleted: [false],
		})
	}

	get f() { return this.createUserForm.controls; }
	get username() { return this.createUserForm.get('username'); }
	get password() { return this.createUserForm.get('password'); }
	get badgeNumber() { return this.createUserForm.get('badgeNumber'); }
	get isApprover() { return this.createUserForm.get('isApprover'); }

	createUser() {
		if (this.createUserForm.invalid) {
			return;
		}

		const formData = this.createUserForm.value;

		this.http.post<any>(this.baseURL, formData).subscribe({
			next: (response) => {
				this.positiveSnackbarService.openPositiveSnackbar("User Created!").afterDismissed().subscribe(() => {
					this.dialogRef.close();
					location.reload();
				});
			},
			error: (error) => {
				this.negativeSnackbarService.openNegativeSnackbar("User Not Created!");
			}
		});
	}
}
