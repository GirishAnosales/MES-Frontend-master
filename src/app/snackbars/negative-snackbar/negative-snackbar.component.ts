import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-negative-snackbar',
  templateUrl: './negative-snackbar.component.html',
  styleUrls: ['./negative-snackbar.component.scss']
})
export class NegativeSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
