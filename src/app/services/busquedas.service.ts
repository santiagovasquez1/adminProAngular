import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': this.token
    });
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${environment.base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, { headers: this.headers })
      .pipe(
        map((resp: any) => resp.result)
      );
  }
}
