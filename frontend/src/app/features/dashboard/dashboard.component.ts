
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  covidStats: any = null;
  monkeypoxStats: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStatsForPandemic(1, 'covid');
    this.fetchStatsForPandemic(2, 'monkeypox');
  }

  fetchStatsForPandemic(typeId: number, key: 'covid' | 'monkeypox') {
    const payload = {
      countryId: '63',
      typeId: typeId,
      startDate: this.todayString(),
      endDate: this.todayString()
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

          if (key === 'covid') this.covidStats = total;
          else this.monkeypoxStats = total;
        }
      },
      error: (err) => console.error(`Erreur stats ${key} :`, err)
    });
  }

  todayString(): string {
    return new Date().toISOString().slice(0, 10);
=======
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private renderer: Renderer2) {}

  enableDaltonismMode() {
    this.renderer.addClass(document.body, 'daltonien');
  }

  disableDaltonismMode() {
    this.renderer.removeClass(document.body, 'daltonien');
  }
}
