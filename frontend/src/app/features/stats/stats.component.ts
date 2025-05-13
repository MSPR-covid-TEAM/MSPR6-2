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
  startDate: string = '2020-01-01';
  endDate: string = '2020-12-31';

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
  updateFlag = false;
  chartVisible = false;

  totalCases = 0;
  totalDeaths = 0;
  totalRecoveries = 0;

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
        // 🔁 Grouper les données par mois
        const groupedByMonth: Record<string, { cas: number; deces: number; gueris: number }> = {};

        data.forEach(entry => {
          const date = new Date(entry.date);
          const month = date.toLocaleString('default', { month: 'long' });
          const key = `${month} ${date.getFullYear()}`;

          if (!groupedByMonth[key]) {
            groupedByMonth[key] = { cas: 0, deces: 0, gueris: 0 };
          }

          groupedByMonth[key].cas += entry.nouveaux_cas;
          groupedByMonth[key].deces += entry.nouveaux_deces;
          groupedByMonth[key].gueris += entry.nouveaux_gueris;
        });

        const categories = Object.keys(groupedByMonth);
        const cases = categories.map(month => groupedByMonth[month].cas);
        const deaths = categories.map(month => groupedByMonth[month].deces);
        const recoveries = categories.map(month => groupedByMonth[month].gueris);

        // Totaux
        this.totalCases = cases.reduce((sum, val) => sum + val, 0);
        this.totalDeaths = deaths.reduce((sum, val) => sum + val, 0);
        this.totalRecoveries = recoveries.reduce((sum, val) => sum + val, 0);

        this.chartVisible = false;

        setTimeout(() => {
          this.chartOptions = {
            chart: { type: 'column', backgroundColor: '#f8f9fa' },
            title: { text: 'Statistiques mensuelles', style: { color: '#333', fontSize: '20px' } },
            xAxis: { categories, labels: { style: { color: '#666' } } },
            yAxis: { title: { text: 'Nombre de cas', style: { color: '#666' } } },
            series: [
              { name: 'Nouveaux cas', data: cases, color: '#007bff', type: 'column' },
              { name: 'Nouveaux décès', data: deaths, color: '#dc3545', type: 'column' },
              { name: 'Nouveaux guéris', data: recoveries, color: '#28a745', type: 'column' }
            ]
          };

          this.updateFlag = true;
          this.chartVisible = true;
        }, 0);
      },
      error: err => console.error("Erreur chargement des données :", err)
    });
  }

  handleOkClick() {
    // ✅ Validation : max 1 an
    const start = new Date(this.tempStartDate);
    const end = new Date(this.tempEndDate);
    const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    if (diffInMonths > 11) {
      alert('Veuillez sélectionner une période de 12 mois maximum.');
      return;
    }

    this.selectedCountry = this.tempSelectedCountry;
    this.selectedPandemic = this.tempSelectedPandemic;
    this.startDate = this.tempStartDate;
    this.endDate = this.tempEndDate;

    this.fetchData();
  }

  onCountryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.tempSelectedCountry = select.value;
  }

  onPandemicChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.tempSelectedPandemic = select.value;
  }

  onStartDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.tempStartDate = input.value;
  }

  onEndDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.tempEndDate = input.value;
  }
}
