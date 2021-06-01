import { PagesRoutingModule } from './pages/pages.routing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFountComponent } from './no-page-fount/no-page-fount.component';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "**", component: NoPageFountComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
