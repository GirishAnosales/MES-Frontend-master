import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BreadcrumbsService {
	breadcrumbs: string[] = [];

	constructor(private router: Router) {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		).subscribe(() => {
			this.updateBreadcrumbs();
		});
	}

	private updateBreadcrumbs(): void {
		const root = this.router.routerState.snapshot.root;
		this.breadcrumbs = this.createBreadcrumbs(root);
	}

	private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: string[] = []): string[] {
		if (!route.routeConfig) {
			return breadcrumbs;
		}

		const path = route.routeConfig.path;
		const nextUrl = `${url}${path}/`;

		const breadcrumbLabel = route.data && route.data['breadcrumb'] ? route.data['breadcrumb'] : path;
		breadcrumbs.push(breadcrumbLabel);

		return route.firstChild
			? this.createBreadcrumbs(route.firstChild, nextUrl, breadcrumbs)
			: breadcrumbs;
	}
}
