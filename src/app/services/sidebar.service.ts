import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[];

  constructor() {
    this.menu = [
      {
        titulo: "Principal",
        icono:'mdi mdi-gauge',
        submenu:[
          {
            titulo:'Dashboard',
            url:'/'
          },
          {
            titulo:'ProgressBar',
            url:'progress'
          },
          {
            titulo:'Greficas',
            url:'grafica1'
          },
        ]
      }

    ];
  }
}
