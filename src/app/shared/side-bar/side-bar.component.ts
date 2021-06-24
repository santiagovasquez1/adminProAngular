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
  constructor(private sidebarService: SidebarService) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
  }

}
