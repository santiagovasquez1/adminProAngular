import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementorComponent } from './incrementor/incrementor.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    IncrementorComponent,
    DonaComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports:[
    IncrementorComponent,
    DonaComponent,
    ModalImagenComponent
  ]
})
export class ComponentsModule { }
