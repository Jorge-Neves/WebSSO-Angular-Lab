import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent {
  repos: any[] = [];
  firstName: string = '';
  constructor(public auth: AuthService, private http: HttpClient) {}

  nameHandler(fullName: string) {
    const trimmed = fullName.trim(); // removes leading and trailing spaces
    const firstNameSplit = trimmed.split(' ')[0];
    return firstNameSplit;
  }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      if (user?.nickname) {
        const url = `https://api.github.com/users/${user.nickname}/repos`;
        this.http.get<any[]>(url).subscribe((data) => {
          this.repos = data;
          this.firstName = this.nameHandler(user.name ?? '');
        });
      }
    });
  }
}
