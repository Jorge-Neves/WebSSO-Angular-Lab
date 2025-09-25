import { Injectable, signal, effect } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthSignalService {
  isAuthenticated = signal(false);

  constructor(private auth0: Auth0Service) {
    // Update the signal whenever Auth0 Observable emits
    auth0.isAuthenticated$.subscribe((loggedIn) => {
      this.isAuthenticated.set(loggedIn);
    });
  }

  // Expose Observable publicly
  get isAuthenticated$(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
  }
}
