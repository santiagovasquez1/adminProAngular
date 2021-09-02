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
  public imageUrl: string = ''
  public userName: string = '';

  constructor(private sidebarService: SidebarService, private userService: UsuarioService) {
    this.menuItems = this.sidebarService.menu;
    this.imageUrl = this.userService.user.imageUrl;
    this.userName = this.userService.user.name;
  }

  ngOnInit(): void {
  }

}
