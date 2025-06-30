import { Component, OnInit, DoCheck } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-us',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './us-cluster.component.html',
  styleUrls: ['./us-cluster.component.css']
})
export class AppComponent implements DoCheck {
  menuOpen = false;
  private lastLang: string | null = null;

  ClusterName = "us-cluster";

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
    const lang = localStorage.getItem('user_lang') || 'UnitedState';
    if (lang !== this.lastLang) {
      // Redirection selon la langue
      if (lang === 'France') {
        window.location.href = '/fr-cluster';
        return;
      }
      if (lang && lang.startsWith("Suisse")) {
        window.location.href = '/ch-cluster';
        return;
      }
      this.lastLang = lang;
    }
  }
}
