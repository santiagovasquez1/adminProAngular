import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementorComponent } from './incrementor/incrementor.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IncrementorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    IncrementorComponent
  ]
})
export class ComponentsModule { }
