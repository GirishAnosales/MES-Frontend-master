import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { MesManageGroupsComponent } from './pages/mes-manage-groups/mes-manage-groups.component';
import { MesManageUsersComponent } from './pages/mes-manage-groups/mes-manage-users/mes-manage-users.component';
import { MesManageInstructionsComponent } from './pages/mes-manage-instructions/mes-manage-instructions.component';
import { MesDashboardComponent } from './mes-dashboard.component';
import { MesCreateProjectComponent } from './pages/mes-manage-instructions/mes-create-project/mes-create-project.component';
import { MesProjectComponent } from './pages/mes-project/mes-project.component';

const routes: Routes = [
	{ path: '', component: MesDashboardComponent, canActivate: [AuthGuard] },
	{ path: 'manage-groups', component: MesManageGroupsComponent, canActivate: [AuthGuard] },
	{ path: 'manage-instructions', component: MesManageInstructionsComponent, canActivate: [AuthGuard] },
	{ path: 'manage-instructions/:projectName', component: MesProjectComponent, canActivate: [AuthGuard] },
	{ path: 'manage-instructions/:projectName/create-instruction', component: MesCreateProjectComponent, canActivate: [AuthGuard] },
	{ path: 'manage-groups/:groupName', component: MesManageUsersComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MesDashboardRoutingModule { }
