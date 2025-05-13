import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IaService } from '../services/ia.service';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prediction.component.html',
})
export class PredictionComponent {
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

  updateValue(event: Event, key: string) {
    const input = event.target as HTMLInputElement;
    this.form[key] = +input.value;
  }

  result: string | null = null;

  constructor(private iaService: IaService) { }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  onSubmit() {
    this.iaService.predict(this.form).subscribe(res => {
      this.result = res.classe_predite;
    });
  }
}
