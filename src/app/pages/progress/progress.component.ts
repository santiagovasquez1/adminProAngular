import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progreso1: number;
  progreso2: number;

  get getProgeso1() {
    return `${this.progreso1}%`;
  }

  get getProgeso2() {
    return `${this.progreso2}%`;
  }

  constructor() {
    this.progreso1 = 25;
    this.progreso2 = 15;
  }

  ngOnInit(): void {
  }

  cambioValorHijo(event: number) {
    console.log(event);
  }

}
