import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLogin = true;
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.message = '';
    this.username = '';
    this.password = '';
  }

  onSubmit() {
    if (this.isLogin) {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          this.message = 'Login successful!';
          this.router.navigate(['/welcome']);
        },
        error: (error) => {
          this.message = 'Login failed. Please check your credentials.';
        }
      });
    } else {
      this.authService.register(this.username, this.password).subscribe({
        next: (response) => {
          this.message = 'Registration successful! Please login.';
          this.isLogin = true;
          this.username = '';
          this.password = '';
        },
        error: (error) => {
          this.message = 'Registration failed. Please try again.';
        }
      });
    }
  }
}