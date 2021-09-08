import { User } from './../../../models/user.model';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public totalUsers: number = 0;
  public from: number = 0;
  public users: User[];

  constructor(private userService: UsuarioService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.cargarUsuarios(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
    }, err => {
      console.log(err)
    });
  }

  cambiarPagina(valor: number) {
    this.from += valor;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= valor;
    }

    this.cargarUsuarios();
  }

}
