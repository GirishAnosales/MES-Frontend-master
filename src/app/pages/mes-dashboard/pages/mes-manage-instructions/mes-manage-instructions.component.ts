import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MesCreateInstructionDialogComponent } from 'src/app/dialogs/mes-create-instruction-dialog/mes-create-instruction-dialog.component';
import { MesCreateUserDialogComponent } from 'src/app/dialogs/mes-create-user-dialog/mes-create-user-dialog.component';
import { MesDeleteGroupDialogComponent } from 'src/app/dialogs/mes-delete-group-dialog/mes-delete-group-dialog.component';
import { MesDeleteInstructionDialogComponent } from 'src/app/dialogs/mes-delete-instruction-dialog/mes-delete-instruction-dialog.component';
import { MesEditGroupDialogComponent } from 'src/app/dialogs/mes-edit-group-dialog/mes-edit-group-dialog.component';
import { MesEditInstructionDialogComponent } from 'src/app/dialogs/mes-edit-instruction-dialog/mes-edit-instruction-dialog.component';
import { MesManageUsersService } from 'src/app/services/mes-manage-users.service';

@Component({
	selector: 'app-mes-manage-instructions',
	templateUrl: './mes-manage-instructions.component.html',
	styleUrls: ['./mes-manage-instructions.component.scss']
})
export class MesManageInstructionsComponent {
	isEmpty = false; // Set this value based on your logic
	projects: any[] = []; // Set your projects data here
	selectedProject: any = null;
	projectName!: string;

	private api_allProjects = "http://localhost:8080/api/project/allProjects";

	constructor(
		private dialog: MatDialog,
		private http: HttpClient,
		private store: Store,
		protected mesManageUsersService: MesManageUsersService,
	) { }

	ngOnInit() {
		this.getAllProjects();
	}

	// CREATE PROJECT DIALOG
	openCreateProjectDialog() {
		this.dialog.open(MesCreateInstructionDialogComponent);
	}

	// CREATE INSTRUCTION DIALOG
	openCreateInstructionDialog(projectName: string) {
		console.log("Open Create Instruction Dialog:", projectName);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = projectName;
		this.dialog.open(MesCreateUserDialogComponent, dialogConfig);
	}

	// EDIT PROJECT DIALOG
	openEditProjectDialog(projectData: object) {
		console.log(projectData);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = projectData;
		this.dialog.open(MesEditInstructionDialogComponent, dialogConfig);
	}

	// DELETE PROJECT DIALOG
	openDeleteProjectDialog(projectId: number) {
		console.log(projectId);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = projectId;
		this.dialog.open(MesDeleteInstructionDialogComponent, dialogConfig);
	}

	// GET ALL PROJECT
	getAllProjects() {
		this.http.get<any>(this.api_allProjects).subscribe({
			next: (response) => {
				this.isEmpty = false;
				this.projects = response;
			},
			error: (error) => {
				this.isEmpty = true;
				console.error('Error fetching groups:', error);
			}
		});
	}
}
