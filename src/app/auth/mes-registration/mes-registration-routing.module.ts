import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesRegistrationComponent } from './mes-registration.component';

const routes: Routes = [
	{ path: '', component: MesRegistrationComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MesRegistrationRoutingModule { }
