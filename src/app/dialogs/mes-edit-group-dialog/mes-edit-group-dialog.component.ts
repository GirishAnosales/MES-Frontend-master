import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MesCreateGroupDialogComponent } from '../mes-create-group-dialog/mes-create-group-dialog.component';
import { MesGroup } from 'src/app/interfaces/mes-group';
import { PositiveSnackbarComponent } from 'src/app/snackbars/positive-snackbar/positive-snackbar.component';
import { NegativeSnackbarComponent } from 'src/app/snackbars/negative-snackbar/negative-snackbar.component';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';

@Component({
	selector: 'app-mes-edit-group-dialog',
	templateUrl: './mes-edit-group-dialog.component.html',
	styleUrls: ['./mes-edit-group-dialog.component.scss']
})
export class MesEditGroupDialogComponent {

	editGroupForm!: FormGroup;
	isSubmitting: boolean = false;

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
		@Inject(MAT_DIALOG_DATA) public groupData: MesGroup
	) {
		this.editGroupForm = this.fb.group({
			groupName: [groupData.groupName],
			groupDescription: [groupData.groupDescription],
			updatedAt: new FormControl(new Date()),
			canRead: [groupData.canRead],
			canCreateInstructions: [groupData.canCreateInstructions],
			canEditInstructions: [groupData.canEditInstructions],
			canDeleteInstructions: [groupData.canDeleteInstructions],
			canCreateUser: [groupData.canCreateUser],
			canEditUser: [groupData.canEditUser],
			canDeleteUser: [groupData.canDeleteUser],
			canCreateGroup: [groupData.canCreateGroup],
			canEditGroup: [groupData.canEditGroup],
			canDeleteGroup: [groupData.canDeleteGroup],
			canNeedAdminApproval: [groupData.canNeedAdminApproval],
		})
	}

	get f() { return this.editGroupForm.controls; }
	get groupName() { return this.editGroupForm.get('groupName'); }
	get groupDescription() { return this.editGroupForm.get('groupDescription'); }
	get canRead() { return this.editGroupForm.get('canRead'); }
	get canCreateInstructions() { return this.editGroupForm.get('canCreateInstructions'); }
	get canEditInstructions() { return this.editGroupForm.get('canEditInstructions'); }
	get canDeleteInstructions() { return this.editGroupForm.get('canDeleteInstructions'); }
	get canCreateUser() { return this.editGroupForm.get('canCreateUser'); }
	get canEditUser() { return this.editGroupForm.get('canEditUser'); }
	get canDeleteUser() { return this.editGroupForm.get('canDeleteUser'); }
	get canCreateGroup() { return this.editGroupForm.get('canCreateGroup'); }
	get canEditGroup() { return this.editGroupForm.get('canEditGroup'); }
	get canDeleteGroup() { return this.editGroupForm.get('canDeleteGroup'); }
	get canNeedAdminApproval() { return this.editGroupForm.get('canNeedAdminApproval'); }

	updateGroup() {
		const groupId = this.groupData.id;
		const formData = this.editGroupForm.value;

		this.isSubmitting = true;

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
				this.isSubmitting = false;
				this.negativeSnackbarService.openNegativeSnackbar("Updating Group Failed!");
			},
			complete: () => {
				this.isSubmitting = false;
			}
		});

		console.log('Updating Group Form submitted:', formData);
	}
}
