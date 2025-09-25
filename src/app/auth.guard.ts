// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSignalService } from './services/auth-signal.service';
import { NotificationSignalService } from './services/notification-signal.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthSignalService);
  const notifications = inject(NotificationSignalService);
  const router = inject(Router);

  try {
    const loggedIn = await firstValueFrom(auth.isAuthenticated$);
    auth.isAuthenticated.set(loggedIn);

    if (!loggedIn) {
      console.error('user needs to be logged in');
      notifications.sendMessage('You need to be logged in!');
      router.navigate(['/']);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking authentication', error);
    notifications.sendMessage('You need to be logged in!');
    router.navigate(['/']);
    return false;
  }
};
