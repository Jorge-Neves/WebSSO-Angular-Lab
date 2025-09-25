import { Component, Inject, effect } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { NotificationSignalService } from '../../services/notification-signal.service';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
})
export class AuthComponent {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    private notifications: NotificationSignalService
  ) {
    effect(() => {
      const msg = this.notifications.message();
      console.log(msg);
      if (msg) {
        alert(msg);
        this.notifications.clearMessage();
      }
    });
  }
}
