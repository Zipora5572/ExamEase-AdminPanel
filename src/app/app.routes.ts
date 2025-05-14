import { Routes } from '@angular/router';
// import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    // canActivate: [authGuard, adminGuard]
  },
  {
    path: 'users/new',
    component: UserFormComponent,
    // canActivate: [authGuard, adminGuard]
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
    // canActivate: [authGuard, adminGuard]
  },
  
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
