import { Medico } from './../models/medico.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  getMedicos() {
    const url = `${environment.base_url}/Medicos`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((resp: { ok: boolean, medicos: Medico[] }) => resp.medicos)
    );
  }

  crearMedico(medico: Medico) {
    const url = `${environment.base_url}/Medicos`;
    return this.http.post(url, medico, { headers: this.headers });
  }

  ActualizarMedico(medico: Medico) {
    const url = `${environment.base_url}/Medicos/${medico.uid}`;
    return this.http.put(url, medico, { headers: this.headers });
  }

  borrarMedico(_id: string) {
    const url = `${environment.base_url}/Medicos/${_id}`;
    return this.http.delete(url, { headers: this.headers });
  }
}
