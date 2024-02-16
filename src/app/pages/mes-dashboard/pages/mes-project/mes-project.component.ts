import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MesCreateInstructionDialogComponent } from 'src/app/dialogs/mes-create-instruction-dialog/mes-create-instruction-dialog.component';
import { MesCreateUserDialogComponent } from 'src/app/dialogs/mes-create-user-dialog/mes-create-user-dialog.component';
import { MesDeleteInstructionDialogComponent } from 'src/app/dialogs/mes-delete-instruction-dialog/mes-delete-instruction-dialog.component';
import { MesEditInstructionDialogComponent } from 'src/app/dialogs/mes-edit-instruction-dialog/mes-edit-instruction-dialog.component';
import { MesManageUsersService } from 'src/app/services/mes-manage-users.service';

@Component({
	selector: 'app-mes-project',
	templateUrl: './mes-project.component.html',
	styleUrls: ['./mes-project.component.scss']
})
export class MesProjectComponent {
	isEmpty = false; // Set this value based on your logic
	instructions: any[] = []; // Set your instructions data here
	selectedInstruction: any = null;
	instructionName!: string;

	private api_allInstructions = "http://localhost:8080/api/instruction/allInstructions";

	constructor(
		private dialog: MatDialog,
		private http: HttpClient,
		private store: Store,
		protected mesManageUsersService: MesManageUsersService,
	) { }

	ngOnInit() {
		this.getAllInstructions();
	}
	

	// CREATE INSTRUCTION DIALOG
	openCreateInstructionDialog() {
		this.dialog.open(MesCreateInstructionDialogComponent);
	}

	// CREATE INSTRUCTION DIALOG
	// openCreateInstructionDialog(projectName: string) {
	// 	console.log("Open Create Instruction Dialog:", projectName);
	// 	const dialogConfig = new MatDialogConfig();
	// 	dialogConfig.data = projectName;
	// 	this.dialog.open(MesCreateUserDialogComponent, dialogConfig);
	// }

	// EDIT INSTRUCTION DIALOG
	openEditInstructionDialog(projectData: object) {
		console.log(projectData);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = projectData;
		this.dialog.open(MesEditInstructionDialogComponent, dialogConfig);
	}

	// DELETE INSTRUCTION DIALOG
	openDeleteInstructionDialog(id: number) {
		console.log(id);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = id;
		this.dialog.open(MesDeleteInstructionDialogComponent, dialogConfig);
	}

	// GET ALL INSTRUCTION
	getAllInstructions() {
		this.http.get<any>(this.api_allInstructions).subscribe({
			next: (response) => {
				this.isEmpty = false;
				this.instructions = response;
			},
			error: (error) => {
				this.isEmpty = true;
				console.error('Error fetching groups:', error);
			}
		});
	}
}
