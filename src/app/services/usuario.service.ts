import { LoginForm } from './../interfaces/login-form.interface';
import { Observable } from 'rxjs';
import { RegisterForm } from './../interfaces/register-form.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm): Observable<any> {
    const url = `${environment.base_url}/users`;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(formData);

    return this.http.post<any>(url, params, { headers })
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  login(formData: LoginForm): Observable<any> {
    const url = `${environment.base_url}/login`;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(formData);

    return this.http.post<any>(url, params, { headers })
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

}
