import { Component, OnInit, DoCheck } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fr',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './fr-cluster.component.html',
  styleUrls: ['./fr-cluster.component.css']
})
export class AppComponent implements DoCheck {
  menuOpen = false;
  private lastLang: string | null = null;

    ClusterName = "fr-cluster";

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    window.location.href = '/connexion';
  }

ngDoCheck() {
  const lang = localStorage.getItem('user_lang') || 'France';
  if (lang !== this.lastLang) {
    // Redirection selon la langue
    if (lang === 'UnitedState') {
      window.location.href = '/us-cluster';
      return;
    }
    if (lang === 'Suisse') {
      window.location.href = '/ch-cluster';
      return;
    }
    this.lastLang = lang;
  }
}
}
