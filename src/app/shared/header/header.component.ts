import { User } from './../../models/user.model';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: User;

  constructor(private userService: UsuarioService, private router: Router) {
    this.usuario = this.userService.user;
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }

}
