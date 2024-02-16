import { Injectable } from '@angular/core';
import { MatSnackBarRef, MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { PositiveSnackbarComponent } from './positive-snackbar.component';

@Injectable({
	providedIn: 'root'
})
export class PositiveSnackbarService {

	constructor(
		private _snackBar: MatSnackBar,
	) { }

	openPositiveSnackbar(message: string): MatSnackBarRef<any> {
		const config = new MatSnackBarConfig();
		config.verticalPosition = 'bottom';
		config.horizontalPosition = 'right';
		config.duration = 3000;

		return this._snackBar.openFromComponent(PositiveSnackbarComponent, {
			data: {
				message: message,
			},
			duration: config.duration,
			verticalPosition: config.verticalPosition,
			horizontalPosition: config.horizontalPosition,
		});
	}

}
