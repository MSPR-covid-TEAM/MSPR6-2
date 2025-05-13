import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/predict';

  predict(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
