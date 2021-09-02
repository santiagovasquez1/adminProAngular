import { User } from './../models/user.model';
import { Router } from '@angular/router';
import { LoginForm } from './../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { RegisterForm } from './../interfaces/register-form.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public user: User;

  constructor(private http: HttpClient, private route: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '361830084684-ibu97ktmja2f8qkft6rao07n5iu1kkig.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.route.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    const url = `${environment.base_url}/login/renew`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token
    });
    return this.http.get<any>(url, { headers })
      .pipe(
        tap(resp => {
          this.user = new User(resp.user.name, resp.user.email, '', resp.user.image, resp.user.google, resp.user.role, resp.user.uid);
          localStorage.setItem('token', resp.token);
        }),
        map(resp => true),
        catchError(error => of(false))
      );
  }

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

  loginGoogle(token: any): Observable<any> {
    const url = `${environment.base_url}/login/google`;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(url, { token }, { headers })
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

}
