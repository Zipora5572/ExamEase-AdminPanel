import { createReducer, on } from '@ngrx/store';
import { initialUserState } from './state';
import * as UserActions from "./user.actions"


export const UserReducer = createReducer(
  initialUserState,
  on(UserActions.loadUsers, state => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
 
  on(UserActions.addUser, (state, { user }) => ({
    ...state,
    Users: [...state.users, user]
  })),
  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    Users: state.users.map(c => (c.id === user.id ? user : c))
  })),
  on(UserActions.deleteUser, (state, { UserId }) => ({
    ...state,
    Users: state.users.filter(c => +c.id !== UserId)
  })),
  on(UserActions.deleteUser, (state, { UserId }) => ({
    ...state,
    error: null,
  
  }))
);
