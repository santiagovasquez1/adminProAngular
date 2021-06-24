import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementor',
  templateUrl: './incrementor.component.html',
  styles: [
  ]
})
export class IncrementorComponent implements OnInit {

  @Input('valor') progress: number
  @Input('claseName') btnClass: string;
  @Output() progressEmiter: EventEmitter<number>;

  constructor() {
    this.progress = 50;
    this.progressEmiter = new EventEmitter<number>();
    this.btnClass = 'btn-primary';
  }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changeProgressValue(valor: number) {

    if (this.progress >= 100 && valor >= 0) {
      this.progressEmiter.emit(100);
    }

    if (this.progress <= 0 && valor <= 0) {
      this.progressEmiter.emit(0);
    }

    this.progress = this.progress + valor;
    this.progressEmiter.emit(this.progress);
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.progressEmiter.emit(this.progress);
  }

}
