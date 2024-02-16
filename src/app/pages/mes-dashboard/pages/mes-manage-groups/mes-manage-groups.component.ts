import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MesCreateUserDialogComponent } from '../../../../dialogs/mes-create-user-dialog/mes-create-user-dialog.component';
import { MesDeleteGroupDialogComponent } from 'src/app/dialogs/mes-delete-group-dialog/mes-delete-group-dialog.component';
import { MesEditGroupDialogComponent } from 'src/app/dialogs/mes-edit-group-dialog/mes-edit-group-dialog.component';
import { MesCreateGroupDialogComponent } from 'src/app/dialogs/mes-create-group-dialog/mes-create-group-dialog.component';
import { MesManageUsersService } from 'src/app/services/mes-manage-users.service';
import { Store } from '@ngrx/store';
import { setGroupName } from 'src/app/shared/ngrx/mes-group-ngrx-module/group.actions';
import { selectGroupName } from 'src/app/shared/ngrx/mes-group-ngrx-module/group.selectors';

@Component({
	selector: 'app-mes-manage-groups',
	templateUrl: './mes-manage-groups.component.html',
	styleUrls: ['./mes-manage-groups.component.scss']
})
export class MesManageGroupsComponent implements OnInit {
	isEmpty = false; // Set this value based on your logic
	groups: any[] = []; // Set your groups data here
	filteredGroups: any[] = []; // Set your filtered groups data here
	selectedGroup: any = null;
	groupName!: string;

	private api_allGroups = "http://localhost:8080/api/group/allGroups";

	constructor(
		private dialog: MatDialog,
		private http: HttpClient,
		private store: Store,
		protected mesManageUsersService: MesManageUsersService,
	) { }

	ngOnInit() {
		this.getAllGroups();
	}

	// CREATE GROUP DIALOG
	openCreateGroupDialog() {
		this.dialog.open(MesCreateGroupDialogComponent);
	}

	// CREATE USER DIALOG
	openCreateUserDialog(groupName: string) {
		console.log("Open Create User Dialog:", groupName);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = groupName;
		this.dialog.open(MesCreateUserDialogComponent, dialogConfig);
	}

	// EDIT GROUP DIALOG
	openEditGroupDialog(groupData: object) {
		console.log(groupData);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = groupData;
		this.dialog.open(MesEditGroupDialogComponent, dialogConfig);
	}

	// DELETE GROUP DIALOG
	openDeleteGroupDialog(id: number) {
		console.log(id);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = id;
		this.dialog.open(MesDeleteGroupDialogComponent, dialogConfig);
	}

	// GET ALL GROUPS
	getAllGroups() {
		this.http.get<any>(this.api_allGroups).subscribe({
			next: (response) => {
				this.isEmpty = false;
				this.groups = response;
			},
			error: (error) => {
				this.isEmpty = true;
				console.error('Error fetching groups:', error);
			}
		});
	}

	// GET ALL GROUPS EXCEPT ADMIN
	getGroupsCreatedByUsername() {
		this.http.get<any[]>(this.api_allGroups).subscribe({
			next: (response) => {
				console.log('Response from API:', response);

				this.groups = response;

				// Extract the group names from the objects and filter out "ADMIN"
				// this.filteredGroups = response.map(groupObj => groupObj.groupName).filter(groupName => groupName !== 'ADMIN');

				console.log('Filtered Groups:', this.filteredGroups);

				if (this.groups.length === 0) {
					this.isEmpty = true; // Set isEmpty to true if no valid groups are found
				} else {
					this.isEmpty = false;
				}
			},
			error: (error) => {
				this.isEmpty = true;
				console.error('Error fetching groups:', error);
			}
		});
	}
}
