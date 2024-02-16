import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Import 'of' to handle observable errors
import { setGroupName, fetchUsersSuccess, fetchUsersFailure } from './group.actions'; // Assuming you have these actions defined
import { MesManageUsersService } from 'src/app/services/mes-manage-users.service';

@Injectable()
export class GroupEffects {
    setGroupName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setGroupName),
            mergeMap((action) =>
                this.userService.getUsersByGroupName(action.groupName).pipe(
                    map((users) => fetchUsersSuccess({ users })), // Dispatch success action
                    catchError((error) => of(fetchUsersFailure({ error }))) // Dispatch error action
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private userService: MesManageUsersService
    ) { }
}
