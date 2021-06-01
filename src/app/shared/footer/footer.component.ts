import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  public year:number;
  constructor(private global:GlobalService) {
    this.year=global.myDate.getFullYear();
   }

  ngOnInit(): void {
  }

}
