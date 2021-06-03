import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementor',
  templateUrl: './incrementor.component.html',
  styles: [
  ]
})
export class IncrementorComponent implements OnInit {

  @Input('valor') progress: number
  @Output() progressEmiter: EventEmitter<number>;

  constructor() {
    this.progress = 50;
    this.progressEmiter = new EventEmitter<number>();
  }

  ngOnInit(): void {
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

}
