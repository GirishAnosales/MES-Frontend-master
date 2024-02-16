import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MesUpdateSidenavService {

	private sidenavSubject = new BehaviorSubject<boolean>(false);

	updateSidenav(): void {
		this.sidenavSubject.next(true);
	}

	getSidenavUpdates(): Observable<boolean> {
		return this.sidenavSubject.asObservable();
	}
}
