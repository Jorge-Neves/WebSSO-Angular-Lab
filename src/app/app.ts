import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthButtonComponent } from './authbutton/authbutton';
import { UserProfileComponent } from './user-profile/user-profile';

@Component({
  selector: 'app-root',
  imports: [UserProfileComponent, AuthButtonComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true, // needed if using imports in the component
})
export class App {
  protected readonly title = signal('oidc');
}
