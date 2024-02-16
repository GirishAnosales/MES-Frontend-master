import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authService.isAuthenticated()) {
			return true; // User is authenticated, allow access
		} else {
			this.router.navigate(['/login']); // Redirect to login page
			return false;
		}
	}

	canActivateFn: CanActivateFn = (
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	) => {
		if (this.authService.isAuthenticated()) {
			return true; // User is authenticated, allow access
		} else {
			this.router.navigate(['/login']); // Redirect to login page
			return false;
		}
	};
}

// Create a functional guard using the inject function
export function authGuardFactory(authService: AuthService, router: Router): AuthGuard {
	return new AuthGuard(authService, router);
}