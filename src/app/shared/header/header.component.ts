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

  constructor(private userService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }

}
