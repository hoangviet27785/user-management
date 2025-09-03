import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserFormComponent },
  { path: 'users/:id/view', component: UserFormComponent },
  { path: 'users/:id/edit', component: UserFormComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
