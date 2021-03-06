import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './../guards/auth.guard';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: DashboardComponent,
        data: {
          title: "Dashboard"
        }
      },
      {
        path: "progress",
        component: ProgressComponent
        , data: {
          title: "Progreso"
        }
      },
      {
        path: "grafica1",
        component: Grafica1Component,
        data: {
          title: "Graficas"
        }
      },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: {
          title: "Settings"
        }
      },
      {
        path: "promesas",
        component: PromesasComponent,
        data: {
          title: "Progreso"
        }
      },
      {
        path: "rxjs",
        component: RxjsComponent,
        data: {
          title: "Rxjs"
        }
      },
      {
        path: "perfil",
        component: PerfilComponent,
        data: {
          title: "Perfil de usuario"
        }
      },
      //Mantenimientos
      {
        path: "usuarios",
        component: UsuariosComponent,
        data: {
          title: "Usuarios de la aplicaci??n"
        }
      },
      {
        path: "hospitales",
        component: HospitalesComponent,
        data: {
          title: "Hospitales de la aplicaci??n"
        }
      },
      {
        path: "medicos",
        component: MedicosComponent,
        data: {
          title: "Medicos de la aplicaci??n"
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
