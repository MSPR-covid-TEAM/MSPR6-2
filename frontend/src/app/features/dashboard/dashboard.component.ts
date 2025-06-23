import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ImmersiveReaderComponent } from '../reader/immersive-reader.component';

interface Pandemic {
  id_pandemie: number;
  nom_pandemie: string;
  virus: string;
  date_debut: string;
  date_fin: string;
  description: string;
}

interface Stats {
  cases: number;
  deaths: number;
  recovered: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ImmersiveReaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pandemics: Pandemic[] = [];
  statsByPandemic: { [id: number]: Stats } = {};
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPandemics();
  }

  fetchPandemics() {
    this.http.get<Pandemic[]>('/pandemie').subscribe({
      next: pandemics => {
        this.pandemics = pandemics;
        pandemics.forEach(p => this.fetchStatsForPandemic(p.id_pandemie));
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        console.error('Erreur chargement pandémies:', err);
      }
    });
  }

  fetchStatsForPandemic(typeId: number) {
    const today = new Date().toISOString().slice(0, 10);
    const payload = {
      countryId: '63', // à adapter si besoin
      typeId,
      startDate: today,
      endDate: today
    };

    this.http.post<any[]>('/stats', payload).subscribe({
      next: (data) => {
        if (data.length > 0) {
          const total = data.reduce(
            (acc, curr) => {
              acc.cases += curr.nouveaux_cas || 0;
              acc.deaths += curr.nouveaux_deces || 0;
              acc.recovered += curr.nouveaux_gueris || 0;
              return acc;
            },
            { cases: 0, deaths: 0, recovered: 0 }
          );
          this.statsByPandemic[typeId] = total;
        } else {
          this.statsByPandemic[typeId] = { cases: 0, deaths: 0, recovered: 0 };
        }
      },
      error: (err) => {
        this.statsByPandemic[typeId] = { cases: 0, deaths: 0, recovered: 0 };
        console.error(`Erreur stats pandémie ${typeId}:`, err);
      }
    });
  }
}
