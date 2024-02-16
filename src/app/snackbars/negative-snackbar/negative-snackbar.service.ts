import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NegativeSnackbarComponent } from './negative-snackbar.component';

@Injectable({
	providedIn: 'root'
})
export class NegativeSnackbarService {

	constructor(
		private _snackBar: MatSnackBar,
	) { }

	openNegativeSnackbar(message: string): MatSnackBarRef<any> {
		const config = new MatSnackBarConfig();
		config.verticalPosition = 'bottom';
		config.horizontalPosition = 'right';
		config.duration = 3000;

		return this._snackBar.openFromComponent(NegativeSnackbarComponent, {
			data: {
				message: message,
			},
			duration: config.duration,
			verticalPosition: config.verticalPosition,
			horizontalPosition: config.horizontalPosition,
		});
	}
}
