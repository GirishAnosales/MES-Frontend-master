import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, switchMap } from 'rxjs';
import { MesCreateUserDialogComponent } from 'src/app/dialogs/mes-create-user-dialog/mes-create-user-dialog.component';
import { MesDeleteUserDialogComponent } from 'src/app/dialogs/mes-delete-user-dialog/mes-delete-user-dialog.component';
import { MesEditUserDialogComponent } from 'src/app/dialogs/mes-edit-user-dialog/mes-edit-user-dialog.component';
import { MesManageUsersService } from 'src/app/services/mes-manage-users.service';
import { setGroupName } from 'src/app/shared/ngrx/mes-group-ngrx-module/group.actions';
import { selectGroupName } from 'src/app/shared/ngrx/mes-group-ngrx-module/group.selectors';

@Component({
	selector: 'app-mes-manage-users',
	templateUrl: './mes-manage-users.component.html',
	styleUrls: ['./mes-manage-users.component.scss']
})
export class MesManageUsersComponent implements OnInit, AfterContentChecked {
	userByGroupName: any[] = [];
	superUserByGroupName: any[] = [];
	selectedUser: any = null;
	username!: string;
	groupName!: string;

	private api_user = 'http://localhost:8080/api/user';
	private api_super_user = 'http://localhost:8080/api/superUser';

	constructor(
		private dialog: MatDialog,
		private store: Store,
		private activatedRoute: ActivatedRoute,
		private http: HttpClient,
		private mesManageUsersService: MesManageUsersService,
	) { }

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe(params => {
			this.groupName = params.get('groupName')!;
			console.log("GroupName from mes-manage-users: ", this.groupName);
		});

		this.getSuperUserByUsername();
		this.getUsersByGroupName();
	}

	ngAfterContentChecked() { }

	// GET USERNAME
	getUserName(username: string) {
		this.username = username;
	}

	// GET ALL USERS BY GROUPNAME
	getUsersByGroupName() {
		this.http.get<any>(`${this.api_user}/byGroupName/${this.groupName}`).subscribe({
			next: (response) => {
				this.userByGroupName = response;
				console.log("Get All Users By Group Name: ", response);
			},
			error: (error) => {
				console.error('Error fetching Users By GroupName:', error);
			}
		});
	}

	// GET SUPER USER BY USERNAME
	getSuperUserByUsername() {
		this.http.get<any>(`${this.api_super_user}/byGroupName/${this.groupName}`).subscribe({
			next: (response) => {
				this.superUserByGroupName = response;
				console.log("Get All Users By Group Name: ", response);
			},
			error: (error) => {
				console.error('Error fetching Users By GroupName:', error);
			}
		});
	}

	// CREATE USER DIALOG
	openCreateUserDialog(username: string) {
		console.log("Create User For:", username);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = username;
		this.dialog.open(MesCreateUserDialogComponent, dialogConfig);
	}

	// EDIT USER DIALOG
	openEditUserDialog(userData: object) {
		console.log("Edit User Data:", userData);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = userData;
		this.dialog.open(MesEditUserDialogComponent, dialogConfig);
	}

	// DELETE USER DIALOG
	openDeleteUserDialog(id: number) {
		console.log("Delete User ID:", id);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = id;
		this.dialog.open(MesDeleteUserDialogComponent, dialogConfig);
	}
}
