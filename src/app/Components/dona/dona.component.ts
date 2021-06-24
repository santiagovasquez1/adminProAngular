import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() public Labels: Label[];
  @Input() public Data: ChartDataSets[];


  public scatterChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: "Prueba",
      display: true,
      fontFamily: "calibri",
      fontSize: 20
    },
    legend: {
      display: true,
      reverse: true,
      align: "end",
      labels: {
        fontFamily: "calibri",
        boxWidth: 50
      },
      position: "bottom"
    },
    layout: {
      padding: 5
    },
    showLines: true,
    hover: {
      axis: "x",
      intersect: true,
      mode: "label",
      animationDuration: 300
    },
    scales: {
      scaleLabel: {
        labelString: "Hola",
        display: true,
      },
      xAxes: [
        {
          scaleLabel: {
            display:true,
            labelString:"Tiempo (s)",
            fontSize:15,
            fontFamily:"Arial"
          }
        }
      ],
      yAxes:[
        {
          scaleLabel: {
            display:true,
            labelString:"Sa (g)",
            fontSize:15,
            fontFamily:"Arial"
          }
        }
      ]
    }
  };

  public colors: Color[] = [
    { backgroundColor: ['#6857e6', '#009fee', '#f02059'] }
  ];
  public doughnutChartType: ChartType = 'line';
  @Input() legendTitle: string;

  constructor() {
    this.legendTitle = "";
  }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
