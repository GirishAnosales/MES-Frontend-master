import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MesCreateGroupDialogComponent } from '../mes-create-group-dialog/mes-create-group-dialog.component';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';

@Component({
	selector: 'app-mes-delete-group-dialog',
	templateUrl: './mes-delete-group-dialog.component.html',
	styleUrls: ['./mes-delete-group-dialog.component.scss']
})
export class MesDeleteGroupDialogComponent {

	isDeleting: boolean = false;

	//	SNACKBAR
	// durationInSeconds = 5;
	progressValue: number = 0;
	progressInterval: any;

	//	APIS
	private api_deleteGroup = "http://localhost:8080/api/group/deleteGroup";

	constructor(
		private fb: FormBuilder,
		private _snackBar: MatSnackBar,
		private router: Router,
		private auth: AuthService,
		private http: HttpClient,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
		public dialogRef: MatDialogRef<MesCreateGroupDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public groupId: number
	) { }

	deleteGroup() {
		console.log('Group:', this.groupId);

		this.http.delete(`${this.api_deleteGroup}/${this.groupId}`, { responseType: 'text' }).subscribe({
			next: (response) => {
				console.log('Group Http:', response);
				this.dialogRef.close();
				this.positiveSnackbarService.openPositiveSnackbar("Deleting Group!").afterDismissed().subscribe(() => {
					location.reload();
				});
			},
			error: (error) => {
				console.error('Group:', error);
				this.isDeleting = false;
				this.negativeSnackbarService.openNegativeSnackbar("Deleting Group Failed!").afterDismissed().subscribe(() => {
					location.reload();
				});
			},
			complete: () => {
				this.isDeleting = false;
			}
		});
	}
}
