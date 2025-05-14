import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { addUser, deleteUser, loadUsers, loadUsersFailure, loadUsersSuccess, updateUser } from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
       
          map(users => loadUsersSuccess({ users })),

          catchError(error => {
            //console.error('Error loading Users:', error);
            return of(loadUsersFailure({ error }));
          })
        )
      )
    )
  );
 

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      mergeMap(action =>
        this.userService.createUser(action.user).pipe(
          map(response => {
        
            return loadUsers();
          }),
          catchError(error => {
         //   console.error('Error adding User:', error);
            return of(loadUsersFailure({ error }));
          })
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(action =>
        this.userService.updateUser(action.user.id,action.user).pipe(
          map(() => {
           
            return loadUsers();
          }),
          catchError(error => {
            //console.error('Error updating User:', error);
            return of(loadUsersFailure({ error }));
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(action.UserId).pipe(
          map(() => {

            return loadUsers();
          }),
          catchError(error => {
           // console.error('Error deleting User:', error);
            return of(loadUsersFailure({ error }));
          })
        )
      )
    )
  );

}