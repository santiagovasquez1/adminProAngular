import { User } from './../../models/user.model';
import { UsuarioService } from './../../services/usuario.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {

  public menuItems: any[];
  public usuario: User;

  constructor(private sidebarService: SidebarService, private userService: UsuarioService) {
    this.menuItems = this.sidebarService.menu;
    this.usuario = this.userService.user;
  }

  ngOnInit(): void {
  }

}
