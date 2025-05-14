import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './state';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
)

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
)

export const selectUserById = (UserId: number) => createSelector(
  selectUserState,
  (state: UserState) => state.users.find(User => +User.id ==UserId) 
)

