import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
	selector: 'app-positive-snackbar',
	templateUrl: './positive-snackbar.component.html',
	styleUrls: ['./positive-snackbar.component.scss']
})
export class PositiveSnackbarComponent {
	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
