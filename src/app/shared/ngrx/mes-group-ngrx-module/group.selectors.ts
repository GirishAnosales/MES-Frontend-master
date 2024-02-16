import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupState } from './group.reducer';

const selectGroupState = createFeatureSelector<GroupState>('group');

export const selectGroupName = createSelector(selectGroupState, (state) => state.groupName);
