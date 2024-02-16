import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';
import { MesCreateGroupDialogComponent } from '../mes-create-group-dialog/mes-create-group-dialog.component';
import { MesProject } from 'src/app/interfaces/mes-project';
import { MesCreateInstructionDialogComponent } from '../mes-create-instruction-dialog/mes-create-instruction-dialog.component';

@Component({
	selector: 'app-mes-edit-instruction-dialog',
	templateUrl: './mes-edit-instruction-dialog.component.html',
	styleUrls: ['./mes-edit-instruction-dialog.component.scss']
})
export class MesEditInstructionDialogComponent {

	editProjectForm!: FormGroup;
	isSubmitting: boolean = false;

	//	SNACKBAR
	durationInSeconds = 5;
	progressValue: number = 0;
	progressInterval: any;

	//	APIS
	private api_editProject = "http://localhost:8080/api/project/editProject";

	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
		public dialogRef: MatDialogRef<MesCreateInstructionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public projectData: MesProject
	) {
		this.editProjectForm = this.fb.group({
			projectName: [projectData.projectName],
			projectDescription: [projectData.projectDescription],
			needAdminApproval: [projectData.needAdminApproval],
			updatedAt: new FormControl(new Date()),
		})
	}

	get f() { return this.editProjectForm.controls; }
	get projectName() { return this.editProjectForm.get('projectName'); }
	get projectDescription() { return this.editProjectForm.get('projectDescription'); }
	get needAdminApproval() { return this.editProjectForm.get('needAdminApproval'); }

	updateProject() {
		const projectId = this.projectData.projectId;
		const formData = this.editProjectForm.value;

		this.isSubmitting = true;

		this.http.patch(`${this.api_editProject}/${projectId}`, formData, { responseType: 'text' }).subscribe({
			next: (response) => {
				console.log('Project:', response);
				this.dialogRef.close();
				this.positiveSnackbarService.openPositiveSnackbar("Updating Project!").afterDismissed().subscribe(() => {
					location.reload();
				});
			},
			error: (error) => {
				console.error('Project:', error);
				this.isSubmitting = false;
				this.negativeSnackbarService.openNegativeSnackbar("Updating Project Failed!");
			},
			complete: () => {
				this.isSubmitting = false;
			}
		});

		console.log('Updating Project Form submitted:', formData);
	}
}
