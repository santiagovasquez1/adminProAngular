import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsuarioService) { }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      name: ['123', Validators.required],
      email: ['abc', [Validators.required, Validators.email]]
    });

  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.userService.actualizarUsuario(this.perfilForm.value).subscribe(result => {
      console.log(result);
    });

  }

}
