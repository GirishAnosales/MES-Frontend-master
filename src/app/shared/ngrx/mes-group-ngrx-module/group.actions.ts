// group.actions.ts
import { createAction, props } from '@ngrx/store';
import { MesUser } from 'src/app/interfaces/mes-user';

export const setGroupName = createAction('[Group] Set Group Name', props<{ groupName: string }>());
export const fetchUsersSuccess = createAction('[Group] Fetch Users Success', props<{ users: MesUser[] }>());
export const fetchUsersFailure = createAction('[Group] Fetch Users Failure', props<{ error: any }>());