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

  public imageUrl: string = ''
  public userName: string = '';
  public email: string = '';

  constructor(private userService: UsuarioService, private router: Router) {
    this.imageUrl = this.userService.user.imageUrl;
    this.userName = this.userService.user.name;
    this.email = this.userService.user.email;
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }

}
