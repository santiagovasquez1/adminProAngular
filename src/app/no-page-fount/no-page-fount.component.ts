import { GlobalService } from '../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-page-fount',
  templateUrl: './no-page-fount.component.html',
  styleUrls: ['./no-pages-found.component.css'
  ]
})
export class NoPageFountComponent implements OnInit {

  year: number;
  constructor(private global:GlobalService) {
    this.year = this.global.myDate.getFullYear();
  }

  ngOnInit(): void {
  }

}
