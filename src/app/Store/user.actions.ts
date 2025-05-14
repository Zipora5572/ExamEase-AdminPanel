import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[User List] Load Users');

export const loadUsersSuccess = createAction(
  '[User List] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const addUser = createAction(
  '[User List] Add User',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[User List] Update User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[User List] Delete User',
  props<{ UserId: number }>()
);
