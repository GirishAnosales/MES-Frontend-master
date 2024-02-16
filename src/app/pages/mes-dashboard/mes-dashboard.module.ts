import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesDashboardRoutingModule } from './mes-dashboard-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { MesDashboardComponent } from './mes-dashboard.component';
import { MesManageGroupsComponent } from './pages/mes-manage-groups/mes-manage-groups.component';
import { MesManageUsersComponent } from './pages/mes-manage-groups/mes-manage-users/mes-manage-users.component';
import { MesManageInstructionsComponent } from './pages/mes-manage-instructions/mes-manage-instructions.component';
import { MesDashboardNavigationComponent } from 'src/app/navigation/mes-dashboard-navigation/mes-dashboard-navigation.component';
import { MesCreateGroupDialogComponent } from 'src/app/dialogs/mes-create-group-dialog/mes-create-group-dialog.component';
import { MesCreateUserDialogComponent } from 'src/app/dialogs/mes-create-user-dialog/mes-create-user-dialog.component';
import { MesDeleteGroupDialogComponent } from 'src/app/dialogs/mes-delete-group-dialog/mes-delete-group-dialog.component';
import { MesDeleteUserDialogComponent } from 'src/app/dialogs/mes-delete-user-dialog/mes-delete-user-dialog.component';
import { MesEditGroupDialogComponent } from 'src/app/dialogs/mes-edit-group-dialog/mes-edit-group-dialog.component';
import { MesEditUserDialogComponent } from 'src/app/dialogs/mes-edit-user-dialog/mes-edit-user-dialog.component';
import { MesManageGroupsAndInstructionsSidenavComponent } from 'src/app/navigation/mes-manage-groups-and-instructions-sidenav/mes-manage-groups-and-instructions-sidenav.component';
import { JoinPipe } from 'src/app/pipes/join.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MesCreateProjectComponent } from './pages/mes-manage-instructions/mes-create-project/mes-create-project.component';
import { MesCreateInstructionComponent } from './pages/mes-manage-instructions/mes-create-instruction/mes-create-instruction.component';
import { MesProjectComponent } from './pages/mes-project/mes-project.component';

@NgModule({
	declarations: [
		MesDashboardComponent,
		MesManageGroupsComponent,
		MesManageInstructionsComponent,
		MesManageUsersComponent,
		MesDashboardNavigationComponent,
		MesManageGroupsAndInstructionsSidenavComponent,
		MesCreateGroupDialogComponent,
		MesCreateUserDialogComponent,
		MesDeleteGroupDialogComponent,
		MesDeleteUserDialogComponent,
		MesEditGroupDialogComponent,
		MesEditUserDialogComponent,
		JoinPipe,
		MesCreateProjectComponent,
		MesCreateInstructionComponent,
		MesProjectComponent
	],
	imports: [
		CommonModule,
		MesDashboardRoutingModule,
		MaterialModule,
		LayoutModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
	]
})
export class MesDashboardModule { }
