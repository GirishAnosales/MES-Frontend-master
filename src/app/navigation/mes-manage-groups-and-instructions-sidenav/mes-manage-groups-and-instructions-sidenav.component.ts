import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MesCreateGroupDialogComponent } from '../../dialogs/mes-create-group-dialog/mes-create-group-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MesCreateUserDialogComponent } from '../../dialogs/mes-create-user-dialog/mes-create-user-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
	selector: 'app-mes-manage-groups-and-instructions-sidenav',
	templateUrl: './mes-manage-groups-and-instructions-sidenav.component.html',
	styleUrls: ['./mes-manage-groups-and-instructions-sidenav.component.scss']
})
export class MesManageGroupsAndInstructionsSidenavComponent implements OnInit {

	@Input() username: string = '';

	private getAllGroupsApi = "http://localhost:8080/api/group/allGroups";

	groups: any[] = [];
	panelOpenState = false;
	isLoggedIn: boolean = false;

	constructor(
		private authService: AuthService,
		private dialog: MatDialog,
		private http: HttpClient,
		private router: Router,
	) { }

	openCreateGroupDialog() {
		this.dialog.open(MesCreateGroupDialogComponent);
	}

	openCreateUserDialog() {
		this.dialog.open(MesCreateUserDialogComponent);
	}

	ngOnInit() {
		this.getAllGroups();
	}

	getAllGroups() {
		this.http.get<any>(this.getAllGroupsApi).subscribe({
			next: (response) => {
				this.groups = response;
			},
			error: (error) => {
				console.error('Error fetching groups:', error);
			}
		});
	}

	togglePanel(group: any) {
		group.expanded = !group.expanded;
	}

}
