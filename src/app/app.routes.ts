import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    data: {
      type: 'login',
    },
  },
  {
    path: 'sign-up',
    component: AuthComponent,
    data: {
      type: 'register',
    },
  },
];
