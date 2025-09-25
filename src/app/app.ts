import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true, // needed if using imports in the component
})
export class App {
  protected readonly title = signal('oidc');
}
