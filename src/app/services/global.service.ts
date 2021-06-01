import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public myDate: Date
  constructor() {
    this.myDate = new Date();
  }
}
