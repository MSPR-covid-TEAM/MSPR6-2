// filepath: /[project-name]/[project-name]/app/features/connexion/login.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class ConnexionComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  user: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/user/me').subscribe(data => this.user = data);
  }

  onLogin() {
    if (this.validateForm(this.email, this.password)) {
      // Ici tu peux appeler ton service d'authentification
      console.log('Logging in with:', { email: this.email, password: this.password });
      this.error = '';
    } else {
      this.error = 'Email ou mot de passe invalide';
    }
  }

  onSave() {
    this.http.put('/user/me', this.user).subscribe(() => {
      alert('Profil mis à jour !');
    });
  }

  validateForm(email: string, password: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) && password.length >= 6;
  }
}