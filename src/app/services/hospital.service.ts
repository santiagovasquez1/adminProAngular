import { Hospital } from './../models/hospital.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  getHospitales() {
    const url = `${environment.base_url}/Hospitales`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((resp: { ok: boolean, hospitals: Hospital[] }) => resp.hospitals)
    );
  }

  crearHospital(name: string) {
    const url = `${environment.base_url}/Hospitales`;
    return this.http.post(url, { name }, { headers: this.headers });
  }

  actualizarHospital(_id: string, name: string) {
    const url = `${environment.base_url}/Hospitales/${_id}`;
    return this.http.put(url, { name }, { headers: this.headers });
  }

  borrarHospital(_id: string) {
    const url = `${environment.base_url}/Hospitales/${_id}`;
    return this.http.delete(url, { headers: this.headers });
  }

}
