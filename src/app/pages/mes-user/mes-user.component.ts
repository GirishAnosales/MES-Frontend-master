import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
	selector: 'app-mes-user',
	templateUrl: './mes-user.component.html',
	styleUrls: ['./mes-user.component.scss']
})
export class MesUserComponent {
	cards!: Observable<any[]>;
	matGridListCols: number = 4;
	lotsOfTabs = new Array(10).fill(0).map((_, index) => `Page ${index + 1}`);

	constructor(private breakpointObserver: BreakpointObserver) {
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.initCardsLayout();
		}), 0;
	}

	private initCardsLayout() {
		this.cards = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
			.pipe(
				map(({ matches, breakpoints }) => {
					if (breakpoints[Breakpoints.XSmall] && matches) {
						// For Handset breakpoint
						this.matGridListCols = 1;
						return [
							{ cols: 1, rows: 1 },
							{ cols: 1, rows: 1 },
							{ cols: 1, rows: 1 },
							{ cols: 1, rows: 1 }
						];
					} else if (breakpoints[Breakpoints.Small] && matches) {
						// For Tablet breakpoint
						this.matGridListCols = 2;
						return [
							{ cols: 1, rows: 1 },
							{ cols: 1, rows: 1 },
							{ cols: 1, rows: 1 },
							{ cols: 1, rows: 1 }
						];
					} else {
						// For Web (Large) breakpoint
						this.matGridListCols = 4;
						return [
							{ cols: 1, rows: 1 },
							{ cols: 1, rows: 1 },
							{ cols: 1, rows: 1 },
							{ cols: 1, rows: 1 }
						];
					}
				})
			);
	}

	OnNextStep(){

	}
}
