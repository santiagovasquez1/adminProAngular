import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    BreadCrumbsComponent,
    SideBarComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports:[
    BreadCrumbsComponent,
    SideBarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
