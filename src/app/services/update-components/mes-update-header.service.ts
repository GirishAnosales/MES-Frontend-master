import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MesUpdateHeaderService {

	private headerSubject = new BehaviorSubject<boolean>(false);

	updateHeader(): void {
		this.headerSubject.next(true);
	}

	getHeaderUpdates(): Observable<boolean> {
		return this.headerSubject.asObservable();
	}
}
