import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  countries: any[] = [];
  pandemies: any[] = [];

  selectedCountry: string = '63';
  selectedPandemic: string = '1';
  startDate: string = '2020-03-02';
  endDate: string = '2020-03-10';

  tempSelectedCountry: string = this.selectedCountry;
  tempSelectedPandemic: string = this.selectedPandemic;
  tempStartDate: string = this.startDate;
  tempEndDate: string = this.endDate;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: { type: 'column', backgroundColor: '#f8f9fa' },
    title: { text: 'Statistiques des Pandémies', style: { color: '#333', fontSize: '20px' } },
    xAxis: { categories: [], labels: { style: { color: '#666' } } },
    yAxis: { title: { text: 'Nombre de cas', style: { color: '#666' } } },
    series: []
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCountries();
    this.fetchPandemics();
  }

  fetchCountries() {
    this.http.get<any[]>('/pays').subscribe({
      next: data => this.countries = data,
      error: err => console.error('Erreur pays :', err)
    });
  }

  fetchPandemics() {
    this.http.get<any[]>('/pandemie').subscribe({
      next: data => this.pandemies = data,
      error: err => console.error('Erreur pandémies :', err)
    });
  }

  fetchData() {
    const payload = {
      countryId: this.selectedCountry,
      typeId: this.selectedPandemic,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.http.post<any[]>('/stats', payload).subscribe({
      next: data => {
        const categories = data.map(entry => entry.date);
        const cases = data.map(entry => entry.nouveaux_cas);
        const deaths = data.map(entry => entry.nouveaux_deces);
        const recoveries = data.map(entry => entry.nouveaux_gueris);

        this.chartOptions = {
          ...this.chartOptions,
          xAxis: { ...(this.chartOptions.xAxis as any), categories },
          series: [
            { name: 'Nouveaux cas', data: cases, color: '#007bff', type: 'column' },
            { name: 'Nouveaux décès', data: deaths, color: '#dc3545', type: 'column' },
            { name: 'Nouveaux guéris', data: recoveries, color: '#28a745', type: 'column' }
          ]
        };
      },
      error: err => console.error("Erreur chargement des données :", err)
    });
  }

  handleOkClick() {
    this.selectedCountry = this.tempSelectedCountry;
    this.selectedPandemic = this.tempSelectedPandemic;
    this.startDate = this.tempStartDate;
    this.endDate = this.tempEndDate;
    this.fetchData();
  }
}
