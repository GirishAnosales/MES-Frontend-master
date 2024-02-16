import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';
import { MesCreateUserDialogComponent } from '../mes-create-user-dialog/mes-create-user-dialog.component';

@Component({
	selector: 'app-mes-delete-user-dialog',
	templateUrl: './mes-delete-user-dialog.component.html',
	styleUrls: ['./mes-delete-user-dialog.component.scss']
})
export class MesDeleteUserDialogComponent {
	isDeleting: boolean = false;

	//	SNACKBAR
	// durationInSeconds = 5;
	progressValue: number = 0;
	progressInterval: any;

	//	APIS
	private api_deleteUser = "http://localhost:8080/api/user/delete";

	constructor(
		private fb: FormBuilder,
		private _snackBar: MatSnackBar,
		private router: Router,
		private auth: AuthService,
		private http: HttpClient,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
		public dialogRef: MatDialogRef<MesCreateUserDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public userId: number,
	) { }

	deleteUser() {
		console.log('Group:', this.userId);

		this.http.delete(`${this.api_deleteUser}/${this.userId}`, { responseType: 'text' }).subscribe({
			next: (response) => {
				console.log('User Http:', response);
				this.dialogRef.close();
				this.positiveSnackbarService.openPositiveSnackbar("Deleting User!").afterDismissed().subscribe(() => {
					location.reload();
				});
			},
			error: (error) => {
				console.error('User:', error);
				this.isDeleting = false;
				this.negativeSnackbarService.openNegativeSnackbar("Deleting User Failed!").afterDismissed().subscribe(() => {
					location.reload();
				});
			},
			complete: () => {
				this.isDeleting = false;
			}
		});
	}
}
