import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { PageNotFoundComponent } from './shared/exception/page-not-found/page-not-found.component';
import { MesUserComponent } from './pages/mes-user/mes-user.component';
import { MesUserDataComponent } from './pages/mes-user/mes-user-data/mes-user-data.component';
import { HttpClientModule } from '@angular/common/http';
import { MesRegistrationComponent } from './auth/mes-registration/mes-registration.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PositiveSnackbarComponent } from './snackbars/positive-snackbar/positive-snackbar.component';
import { NegativeSnackbarComponent } from './snackbars/negative-snackbar/negative-snackbar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { groupReducer } from './shared/ngrx/mes-group-ngrx-module/group.reducer';
import { MesCreateInstructionDialogComponent } from './dialogs/mes-create-instruction-dialog/mes-create-instruction-dialog.component';
import { MesDeleteInstructionDialogComponent } from './dialogs/mes-delete-instruction-dialog/mes-delete-instruction-dialog.component';
import { MesEditInstructionDialogComponent } from './dialogs/mes-edit-instruction-dialog/mes-edit-instruction-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		PageNotFoundComponent,
		MesUserComponent,
		MesUserDataComponent,
		MesRegistrationComponent,
		PositiveSnackbarComponent,
		NegativeSnackbarComponent,
		MesCreateInstructionDialogComponent,
		MesDeleteInstructionDialogComponent,
		MesEditInstructionDialogComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		LayoutModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: () => {
					return localStorage.getItem('token');
				},
				allowedDomains: ['localhost'], // Adjust this to match your domain
				disallowedRoutes: ['http://localhost:4200/api/auth'], // Adjust this to match your API routes
			},
		}),
		StoreModule.forFeature('group', groupReducer), // 'group' should match your feature name
		StoreModule.forRoot({}, {}),
		EffectsModule.forRoot([]),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
