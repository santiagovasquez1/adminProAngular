import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });
    console.log("Fin del init");
  }

  getUsuarios(): Promise<any> {

    const promesa = new Promise((resolve, reject) => {

      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));

    });

    return promesa;
  }

}
