import Swal from 'sweetalert2';
import { UsuarioService } from './../../services/usuario.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted: boolean = false;
  public loginForm: FormGroup;
  public auth2: any;

  constructor(private router: Router, private fb: FormBuilder, private userService: UsuarioService, private ngZone: NgZone) {
    this.loginForm = fb.group({
      email: [localStorage.getItem('email') || '', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(result => {
      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');
    }, err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }


  private async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  private attachSignin(element: HTMLElement) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token).subscribe(result => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        }, err => {
          console.log(err);
        });
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2))
      });
  }
}
