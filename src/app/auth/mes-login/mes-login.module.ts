import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesLoginRoutingModule } from './mes-login-routing.module';
import { MesLoginNavigationComponent } from 'src/app/navigation/mes-login-navigation/mes-login-navigation.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { MesLoginComponent } from './mes-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		MesLoginNavigationComponent,
		MesLoginComponent,
	],
	imports: [
		CommonModule,
		MesLoginRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
	]
})
export class MesLoginModule { }
