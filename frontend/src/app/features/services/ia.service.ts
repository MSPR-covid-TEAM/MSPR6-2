import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IaService {
  private http = inject(HttpClient);
  private apiUrlIA = environment.apiUrlIA;

  predict(data: any): Observable<any> {
    return this.http.post(`${this.apiUrlIA}/predict_propagation`, data);
  }
}
