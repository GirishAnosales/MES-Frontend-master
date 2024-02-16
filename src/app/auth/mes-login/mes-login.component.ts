import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';
import { NegativeSnackbarService } from 'src/app/snackbars/negative-snackbar/negative-snackbar.service';

@Component({
	selector: 'app-mes-login',
	templateUrl: './mes-login.component.html',
	styleUrls: ['./mes-login.component.scss']
})
export class MesLoginComponent implements OnInit {
	loginForm!: FormGroup;
	isLoggingIn: boolean = false;

	private baseURL = "http://localhost:8080/auth/login";

	constructor(
		private fb: FormBuilder,
		private _snackBar: MatSnackBar,
		private router: Router,
		private auth: AuthService,
		private http: HttpClient,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
	) {
		this.loginForm = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', Validators.required]
		})
	}

	ngOnInit() {
		// Check if user is already authenticated
		if (this.auth.isAuthenticated()) {
			// Navigate to dashboard
			this.router.navigate(['/dashboard']);
		} else {
			this.router.navigate(['/login']);
		}
	}

	// Convenience getter for easy access to form fields
	get f() { return this.loginForm.controls; }
	get username() { return this.loginForm.get('username'); }
	get password() { return this.loginForm.get('password'); }

	onSubmit() {
		if (this.loginForm.invalid) {
			return;
		}

		const formData = {
			username: this.loginForm.value.username,
			badgeNumber: this.loginForm.value.username, // Assume badge number is also provided in the username field
			password: this.loginForm.value.password
		};

		// Set headers for JSON content type
		const headers = {
			'Content-Type': 'application/json'
		};

		// Send the POST request to try logging in with username
		this.http.post<any>(this.baseURL, formData, { headers }).subscribe({
			next: (response) => {
				this.isLoggingIn = true;
				this.auth.setToken(response.token);
				this.isLoggingIn = false;
				this.positiveSnackbarService.openPositiveSnackbar("Logging In . . .").afterDismissed().subscribe(() => {
					this.router.navigate(['/dashboard']);
				});
			},
			error: (error) => {
				// If login with username fails, try login with badge number
				this.loginWithBadgeNumber(formData, headers);
			}
		});

		console.log('Form submitted:', formData);
	}

	private loginWithBadgeNumber(formData: any, headers: any) {
		// Send the POST request to try logging in with badge number
		this.http.post<any>(this.baseURL, formData, { headers }).subscribe({
			next: (response) => {
				this.isLoggingIn = true;
				this.auth.setToken(response.token);
				this.isLoggingIn = false;
				this.positiveSnackbarService.openPositiveSnackbar("Logging In . . .").afterDismissed().subscribe(() => {
					this.router.navigate(['/dashboard']);
				});
			},
			error: (error) => {
				this.negativeSnackbarService.openNegativeSnackbar("Wrong Credentials!");
			}
		});
	}

	// onSubmit() {
	// 	if (this.loginForm.invalid) {
	// 		return;
	// 	}

	// 	const formData = {
	// 		username: this.loginForm.value.username,
	// 		password: this.loginForm.value.password
	// 	};

	// 	// Set headers for JSON content type
	// 	const headers = {
	// 		'Content-Type': 'application/json'
	// 	};

	// 	// Send the POST request
	// 	this.http.post<any>(this.baseURL, formData, { headers }).subscribe({
	// 		next: (response) => {
	// 			this.isLoggingIn = true;
	// 			this.auth.setToken(response.token);
	// 			this.isLoggingIn = false;
	// 			this.positiveSnackbarService.openPositiveSnackbar("Logging In . . .").afterDismissed().subscribe(() => {
	// 				this.router.navigate(['/dashboard']);
	// 			});
	// 		},
	// 		error: (error) => {
	// 			this.negativeSnackbarService.openNegativeSnackbar("Wrong Credintials!");
	// 		}
	// 	});

	// 	console.log('Form submitted:', formData);
	// }
}