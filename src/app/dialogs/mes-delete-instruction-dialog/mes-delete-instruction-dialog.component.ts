import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';
import { MesCreateGroupDialogComponent } from '../mes-create-group-dialog/mes-create-group-dialog.component';
import { MesCreateInstructionDialogComponent } from '../mes-create-instruction-dialog/mes-create-instruction-dialog.component';

@Component({
	selector: 'app-mes-delete-instruction-dialog',
	templateUrl: './mes-delete-instruction-dialog.component.html',
	styleUrls: ['./mes-delete-instruction-dialog.component.scss']
})
export class MesDeleteInstructionDialogComponent {

	isDeleting: boolean = false;

	//	SNACKBAR
	// durationInSeconds = 5;
	progressValue: number = 0;
	progressInterval: any;

	//	APIS
	private api_deleteProject = "http://localhost:8080/api/project/deleteProject";

	constructor(
		private fb: FormBuilder,
		private _snackBar: MatSnackBar,
		private router: Router,
		private auth: AuthService,
		private http: HttpClient,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
		public dialogRef: MatDialogRef<MesCreateInstructionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public projectId: number
	) { }

	deleteProject() {
		console.log('Project:', this.projectId);

		this.http.delete(`${this.api_deleteProject}/${this.projectId}`, { responseType: 'text' }).subscribe({
			next: (response) => {
				console.log('Project Http:', response);
				this.dialogRef.close();
				this.positiveSnackbarService.openPositiveSnackbar("Deleting Project!").afterDismissed().subscribe(() => {
					location.reload();
				});
			},
			error: (error) => {
				console.error('Project:', error);
				this.isDeleting = false;
				this.negativeSnackbarService.openNegativeSnackbar("Deleting Project Failed!").afterDismissed().subscribe(() => {
					location.reload();
				});
			},
			complete: () => {
				this.isDeleting = false;
			}
		});
	}
}
