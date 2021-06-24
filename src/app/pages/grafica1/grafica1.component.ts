import { ChartDataSets } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {
  public Labels: Label[] = ['1', '2', '3', '4', '5', '6', '7'];
  public Data: ChartDataSets[] = [
    {
      data: [1, 2, 3, 4, 5, 6, 7],
      label: "Datos1",
    },
    {
      data: [0.5, 4.5, 2.5, 3.5, 4.5, 5.5, 6.5],
      label: "Datos2"
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }


}
