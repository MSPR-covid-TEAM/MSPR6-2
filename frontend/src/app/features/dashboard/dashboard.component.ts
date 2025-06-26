import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Pandemic {
  id_pandemie: number;
  nom_pandemie: string;
  virus: string;
  date_debut: string;
  date_fin: string | null;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pandemics: Pandemic[] = [];
  loading = true;

  emojiMap: { [name: string]: string } = {
    'COVID-19': '🦠',
    'Monkeypox': '🐵',
    'Grippe Aviaire': '🐔',
    'Ebola': '🧫',
    'SRAS': '😷',
    'H1N1': '🐷',
    'Cholera': '🚱'
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPandemics();
  }

  fetchPandemics(): void {
    this.http.get<Pandemic[]>('/pandemie').subscribe({
      next: pandemics => {
        this.pandemics = pandemics;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        console.error('Erreur chargement pandémies:', err);
      }
    });
  }

  getEmoji(nom: string): string {
    return this.emojiMap[nom] || '🧬';
  }
}
