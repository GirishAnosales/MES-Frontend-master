import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private router: Router,
		private jwtHelper: JwtHelperService
	) { }

	setToken(token: string) {
		localStorage.setItem('token', token);
	}

	getToken() {
		return localStorage.getItem('token');
	}

	isLoggedIn() {
		return !!this.getToken();
	}

	isAuthenticated() {
		// Check if the user is logged in and the token is not expired
		return this.isLoggedIn() && !this.isTokenExpired();
	}

	isTokenExpired() {
		const token = this.getToken();
		if (!token) {
			return true; // Token doesn't exist, so consider it expired
		}

		return this.jwtHelper.isTokenExpired(token);
	}

	getCurrentUser() {
		const token = this.getToken();

		if (token) {
			const decodedToken = this.jwtHelper.decodeToken(token);
			const userId = decodedToken.sub;
			const username = userId;
			return username;
		} else {
			console.error('Token is null or invalid');
			return null;
		}
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}
}