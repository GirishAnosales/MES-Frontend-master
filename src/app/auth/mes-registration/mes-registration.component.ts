import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, of, timestamp } from 'rxjs';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';

@Component({
	selector: 'app-mes-registration',
	templateUrl: './mes-registration.component.html',
	styleUrls: ['./mes-registration.component.scss']
})
export class MesRegistrationComponent {
	registrationForm!: FormGroup;

	private registration = "http://localhost:8080/auth/registration";
	private getSuperUserByUsername = "http://localhost:8080/api/superUser/bySuperUserName";

	constructor(
		private fb: FormBuilder,
		private _snackBar: MatSnackBar,
		private router: Router,
		private auth: AuthService,
		private http: HttpClient,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
	) {
		this.registrationForm = this.fb.group({
			username: ['superUser1@gmail.com', [Validators.email]],
			password: ['su1', Validators.required],
			badgeNumber: ['SU1', [Validators.required]],
			createdAt: new FormControl(new Date()), // Set initial value to current timestamp
			updatedAt: new FormControl(new Date()), // Set initial value to current timestamp
			isDeleted: new FormControl(false), // Set initial value
		})
	}

	// Convenience getter for easy access to form fields
	get f() { return this.registrationForm.controls; }
	get username() { return this.registrationForm.get('username'); }
	get password() { return this.registrationForm.get('password'); }
	get badgeNumber() { return this.registrationForm.get('badgeNumber'); }

	onSubmit() {
		const formData = this.registrationForm.value;
		formData.createdBy = "MES";
		formData.groupName = "ADMIN";

		// Calling this function to check if the user exists before registration
		this.checkUserExist(formData);
	}
	
	// Function to register the user if they don't exist
	private checkUserExist(formData: any) {
		// Check if the user exists
		this.http.get<boolean>(`${this.getSuperUserByUsername}/${formData.username}`).pipe(
			catchError((error) => {
				if (error.status === 404) {
					// User not found, proceed with registration
					console.log('User not found. Registering...');
					this.registerUser(formData);
				} else {
					console.error('Error checking user existence:', error);
					this.negativeSnackbarService.openNegativeSnackbar("Error checking user existence.");
				}
				// Return an empty observable to prevent the error from being propagated
				return of();
			})
		).subscribe((userExists) => {
			if (userExists) {
				console.log('User already exists.');
				this.negativeSnackbarService.openNegativeSnackbar("User already exists.");
			}
		});
	}

	// Function to register the user if they don't exist
	private registerUser(formData: any) {
		this.http.post<any>(this.registration, formData).subscribe({
			next: (response) => {
				console.log('Registration Successful:', response);
				this.positiveSnackbarService.openPositiveSnackbar("Registration Successful!");
			},
			error: (error) => {
				console.error('Registration failed:', error);
				this.negativeSnackbarService.openNegativeSnackbar("Registration failed!");
			}
		});
	}

	// onSubmit() {
	// 	// if (this.registrationForm.invalid) {
	// 	// 	return;
	// 	// }

	// 	const formData = this.registrationForm.value;
	// 	formData.createdBy = "MES";
	// 	formData.groupName = "ADMIN";

	// 	this.http.post<any>(this.baseURL, formData).subscribe({
	// 		next: (response) => {
	// 			console.log('Registration Successful:', response);
	// 			this.positiveSnackbarService.openPositiveSnackbar("Registration Successful!");
	// 		},
	// 		error: (error) => {
	// 			console.error('Registration failed:', error);
	// 			this.negativeSnackbarService.openNegativeSnackbar("Registration failed!");
	// 		}
	// 	});

	// 	console.log('Registration Form submitted:', formData);
	// }
}
