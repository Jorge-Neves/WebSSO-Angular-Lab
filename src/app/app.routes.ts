import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth';
import { ProfileComponent } from './pages/profile/profile';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
];
