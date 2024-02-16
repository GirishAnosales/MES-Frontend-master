import { createReducer, on } from '@ngrx/store';
import { setGroupName } from './group.actions';

export interface GroupState {
  groupName: string;
}

const initialState: GroupState = {
  groupName: '',
};

export const groupReducer = createReducer(
  initialState,
  on(setGroupName, (state, { groupName }) => ({ ...state, groupName }))
);
