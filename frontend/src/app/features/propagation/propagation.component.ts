import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IaService } from '../services/ia.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-propagation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './propagation.component.html',
  styleUrls: ['./propagation.component.css']
})
export class PropagationComponent {
  form: { [key: string]: number } = {
    nouveaux_cas: 0,
    nouveaux_deces: 0,
    nouveaux_gueris: 0,
    moyenne_3j_cas: 0,
    moyenne_3j_deces: 0,
    moyenne_3j_gueris: 0,
    croissance_cas: 0,
    ratio_gueris_cas: 0
  };

  prediction: number | null = null;

  constructor(private iaService: IaService) { }

  updateValue(event: Event, key: string) {
    const input = event.target as HTMLInputElement;
    this.form[key] = +input.value;

    const output = input.parentElement?.querySelector('output') as HTMLElement;
    const min = +input.min;
    const max = +input.max;
    const percent = (this.form[key] - min) / (max - min);
    input.style.setProperty('--percent', `${percent * 100}%`);

    if (output) {
      const thumbSize = 16;
      const trackWidth = input.offsetWidth;
      const x = percent * (trackWidth - thumbSize) + thumbSize / 2;
      output.style.left = `${x}px`;
    }
  }
  objectKeys = Object.keys;

  formatKey(key: string): string {
    return key.replace(/_/g, ' ');
  }

  chart: any;

  updateChart() {
    const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement;
    if (this.chart) this.chart.destroy();

    const data = [
      this.form['nouveaux_cas'],
      this.prediction
    ];

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cas actuels', 'Cas prédits à J+3'],
        datasets: [{
          label: 'Nombre de cas',
          data,
          backgroundColor: ['#3b82f6', '#2563eb']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Cas' }
          }
        }
      }
    });
  }

  onSubmit() {
    this.iaService.predict(this.form).subscribe(res => {
      this.prediction = res.nouveaux_cas_Jplus3_predits;
      this.updateChart();
    });
  }

  showPopup = false;

  openPopup(event: Event) {
    event.preventDefault();
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
