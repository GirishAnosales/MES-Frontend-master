import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { PositiveSnackbarService } from 'src/app/snackbars/positive-snackbar/positive-snackbar.service';

@Component({
	selector: 'app-mes-dashboard-navigation',
	templateUrl: './mes-dashboard-navigation.component.html',
	styleUrls: ['./mes-dashboard-navigation.component.scss']
})
export class MesDashboardNavigationComponent implements OnInit, AfterContentChecked {

	isSmall!: Observable<boolean>
	isMediumLargeXLarge!: Observable<boolean>
	isXSmallScreen = false;

	isLoggedIn: boolean = false;
	username: string = '';
	groupName!: string;

	constructor(
		private breakpointObserver: BreakpointObserver,
		private authService: AuthService,
		public breadcrumbsService: BreadcrumbsService,
		private positiveSnackbarService: PositiveSnackbarService,
	) { }

	// ON INIT
	ngOnInit(): void {
		this.isSmall = this.breakpointObserver
			.observe([Breakpoints.XSmall])
			.pipe(map(res => res.matches));

		this.isMediumLargeXLarge = this.breakpointObserver
			.observe([
				Breakpoints.Medium,
				Breakpoints.Large,
				Breakpoints.XLarge,
			])
			.pipe(map(res => res.matches));
	}

	// AFTER CONTENT CHECKED
	ngAfterContentChecked() {
		// GET LOGGEDIN USERNAME
		this.isLoggedIn = this.authService.isLoggedIn();
		if (this.isLoggedIn) {
			this.username = this.authService.getCurrentUser();
		}
	}

	scrollToTop() {
		window.scrollTo(0, 0);
	}

	logout() {
		this.positiveSnackbarService.openPositiveSnackbar("Logging Out . . .").afterDismissed().subscribe(() => {
			this.authService.logout();
		});
	}
}
