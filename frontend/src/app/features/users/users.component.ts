import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id_user: number;
  nom: string;
  prenom: string;
  email: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  editingId: number | null = null;
  editUser: Partial<User & { password?: string }> = {};
  feedback = '';
  connectedUserId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const id = localStorage.getItem('user_id');
    this.connectedUserId = id ? parseInt(id, 10) : null;
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('/user').subscribe(users => this.users = users);
  }

  startEdit(user: User) {
    this.editingId = user.id_user;
    this.editUser = { ...user, password: '' };
    this.feedback = '';
  }

  cancelEdit() {
    this.editingId = null;
    this.editUser = {};
    this.feedback = '';
  }

  saveEdit() {
    if (!this.editUser.nom || !this.editUser.prenom || !this.editUser.email) {
      this.feedback = 'Tous les champs sont obligatoires';
      return;
    }
    const body: any = {
      nom: this.editUser.nom,
      prenom: this.editUser.prenom,
      email: this.editUser.email
    };
    if (this.editUser.password && this.editUser.password.length >= 6) {
      body.password = this.editUser.password;
    }
    this.http.put(`/user/${this.editingId}`, body).subscribe({
      next: () => {
        this.feedback = 'Utilisateur mis à jour !';
        this.editingId = null;
        this.editUser = {};
        this.loadUsers();
      },
      error: () => this.feedback = 'Erreur lors de la mise à jour'
    });
  }

  deleteUser(user: User) {
    if (confirm('Supprimer cet utilisateur ?')) {
      this.http.delete(`/user/${user.id_user}`).subscribe({
        next: () => {
          this.feedback = 'Utilisateur supprimé !';
          this.loadUsers();
        },
        error: () => this.feedback = 'Erreur lors de la suppression'
      });
    }
  }
}