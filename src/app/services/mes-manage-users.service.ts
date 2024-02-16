import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MesManageUsersService {
	private groupName: string = '';

	setGroupName(groupName: string) {
		this.groupName = groupName;
	}

	getGroupName(): string {
		return this.groupName;
	}
}
