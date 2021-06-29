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
            titulo:'Graficas',
            url:'grafica1'
          },
          {
            titulo:'Promesas',
            url:'promesas'
          },
          {
            titulo:'Rxjs',
            url:'rxjs'
          }
        ]
      }

    ];
  }
}