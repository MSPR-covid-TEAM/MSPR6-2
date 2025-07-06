import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  nom = '';
  prenom = '';
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    if (this.nom && this.prenom && this.email && this.password.length >= 6) {
      this.http.post<any>(`${environment.apiUrl}/auth/register`, {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password
      }).subscribe({
        next: () => {
          this.error = '';
          this.router.navigate(['/connexion']);
        },
        error: (err) => {
          this.error = err.error?.message || 'Erreur lors de l’inscription';
        }
      });
    } else {
      this.error = 'Tous les champs sont obligatoires (mot de passe ≥ 6 caractères)';
    }
  }
}
