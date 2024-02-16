import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MesUpdateOnNavigationService {

	private updateSubject = new BehaviorSubject<boolean>(false);

	updateNavigation(): void {
		this.updateSubject.next(true);
	}

	getNavigationUpdates(): Observable<boolean> {
		return this.updateSubject.asObservable();
	}
}
