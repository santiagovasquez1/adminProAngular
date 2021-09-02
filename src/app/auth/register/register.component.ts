import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted: boolean = false;
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {

    this.registerForm = fb.group({
      name: ['Santiago', [Validators.required, Validators.minLength(3)]],
      email: ['test100@gmail.com', [Validators.email, Validators.required]],
      password: ['123', [Validators.required]],
      password2: ['123', [Validators.required]],
      terminos: [true, [Validators.required]]
    }, {
      validators: this.passwordsIguales('password', 'password2')
    });
  }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      console.log('Posteando form');
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe(result => {
        this.router.navigateByUrl('/');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    } else {
      console.log('Formulario no es correcto');
    }
  }

  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  validarContrasenia(): boolean {
    const pass1 = this.registerForm.get('password');
    const pass2 = this.registerForm.get('password2');

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }
}
