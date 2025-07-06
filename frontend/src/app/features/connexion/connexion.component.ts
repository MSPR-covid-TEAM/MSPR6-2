import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ConnexionComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  user: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/user/me`).subscribe(data => this.user = data);
  }

  onLogin() {
    if (this.validateForm(this.email, this.password)) {
      this.http.post<any>(`${environment.apiUrl}/auth/login`, {
        identifier: this.email,
        password: this.password
      }).subscribe({
        next: (res) => {
          localStorage.setItem('jwt_token', res.token);
          localStorage.setItem('user_id', res.userId);
          localStorage.setItem('user_lang', res.lang);
          this.error = '';
          console.log('[LOGIN] user_lang:', res.lang);
          window.location.href = '/';
        },
        error: () => {
          this.error = 'Email ou mot de passe invalide';
        }
      });
    } else {
      this.error = 'Email ou mot de passe invalide';
    }
  }

  onSave() {
    this.http.put(`${environment.apiUrl}/user/me`, this.user).subscribe(() => {
      alert('Profil mis à jour !');
    });
  }

  validateForm(email: string, password: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) && password.length >= 6;
  }
}
