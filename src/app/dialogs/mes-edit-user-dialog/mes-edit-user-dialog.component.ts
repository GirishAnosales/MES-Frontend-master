import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MesGroup } from 'src/app/interfaces/mes-group';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';
import { MesCreateGroupDialogComponent } from '../mes-create-group-dialog/mes-create-group-dialog.component';
import { MesUser } from 'src/app/interfaces/mes-user';

@Component({
	selector: 'app-mes-edit-user-dialog',
	templateUrl: './mes-edit-user-dialog.component.html',
	styleUrls: ['./mes-edit-user-dialog.component.scss']
})
export class MesEditUserDialogComponent {

	editUserForm!: FormGroup;
	edit: boolean = false;

	//	SNACKBAR
	durationInSeconds = 5;
	progressValue: number = 0;
	progressInterval: any;

	//	APIS
	private baseURL = "http://localhost:8080/api/group/editGroup";

	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
		public dialogRef: MatDialogRef<MesCreateGroupDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public userData: MesUser
	) {
		this.editUserForm = this.fb.group({
			username: [{ value: userData.username, disabled: true }],
			password: [{ value: userData.password, disabled: true }],
			badgeNumber: [{ value: userData.badgeNumber, disabled: true }],
			createdAt: new FormControl(new Date()),
			updatedAt: new FormControl(new Date()),
			groupName: [{ value: userData.groupName, disabled: true }],
			isDeleted: [{ value: userData.isDeleted, disabled: true }],
			createdBy: [{ value: userData.createdBy, disabled: true }],
		});
	}

	get f() { return this.editUserForm.controls; }
	get username() { return this.editUserForm.get('username'); }
	get password() { return this.editUserForm.get('password'); }
	get badgeNumber() { return this.editUserForm.get('badgeNumber'); }
	get createdAt() { return this.editUserForm.get('createdAt'); }
	get updatedAt() { return this.editUserForm.get('updatedAt'); }
	get groupName() { return this.editUserForm.get('groupName'); }
	get isDeleted() { return this.editUserForm.get('isDeleted'); }
	get createdBy() { return this.editUserForm.get('createdBy'); }

	updateGroup() {
		const groupId = this.userData.id;
		const formData = this.editUserForm.value;

		this.http.patch(`${this.baseURL}/${groupId}`, formData, { responseType: 'text' }).subscribe({
			next: (response) => {
				console.log('Group:', response);
				this.dialogRef.close();
				this.positiveSnackbarService.openPositiveSnackbar("Updating Group!").afterDismissed().subscribe(() => {
					location.reload();
				});
			},
			error: (error) => {
				console.error('Group:', error);
				this.negativeSnackbarService.openNegativeSnackbar("Updating Group Failed!");
			}
		});

		console.log('Updating Group Form submitted:', formData);
	}

	toggleEdit() {
		this.edit = !this.edit;
		if (this.edit) {
			this.editUserForm.enable(); // Enable all form controls
		} else {
			this.editUserForm.disable(); // Disable all form controls
		}
	}
}
