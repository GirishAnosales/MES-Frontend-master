import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/exception/page-not-found/page-not-found.component';
import { MesUserComponent } from './pages/mes-user/mes-user.component';
import { MesRegistrationComponent } from './auth/mes-registration/mes-registration.component';
import { AuthGuard } from './auth/auth.guard';
import { MesDashboardNavigationComponent } from './navigation/mes-dashboard-navigation/mes-dashboard-navigation.component';
import { MesLoginNavigationComponent } from './navigation/mes-login-navigation/mes-login-navigation.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		component: MesLoginNavigationComponent,
		loadChildren: () => import('./auth/mes-login/mes-login.module').then(m => m.MesLoginModule)
	},
	{
		path: 'registration',
		component: MesRegistrationComponent,
		loadChildren: () => import('./auth/mes-registration/mes-registration.module').then(m => m.MesRegistrationModule)
	},
	{
		path: 'dashboard',
		component: MesDashboardNavigationComponent,
		loadChildren: () => import('./pages/mes-dashboard/mes-dashboard.module').then(m => m.MesDashboardModule),
		canActivate: [AuthGuard],
		data: { breadcrumb: 'Dashboard' }
	},

	{ path: 'user', component: MesUserComponent, canActivate: [AuthGuard], data: { breadcrumb: 'User' } },
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
