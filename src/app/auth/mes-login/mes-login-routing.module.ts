import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesLoginComponent } from './mes-login.component';

const routes: Routes = [
	{ path: '', component: MesLoginComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MesLoginRoutingModule { }
