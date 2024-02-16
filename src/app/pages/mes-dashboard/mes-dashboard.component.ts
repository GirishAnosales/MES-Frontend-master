import { AfterViewInit, Component } from '@angular/core';

@Component({
	selector: 'app-mes-dashboard',
	templateUrl: './mes-dashboard.component.html',
	styleUrls: ['./mes-dashboard.component.scss']
})
export class MesDashboardComponent {
	protected buttons = [
		{ name: "Manage Groups", routerlink: "manage-groups" },
		{ name: "Manage Instructinons", routerlink: "manage-instructions" },
	]
}
