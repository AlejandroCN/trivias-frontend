import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const rutas: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      titulo: 'Trivias App - Entrar',
      descripcion: 'Inicio de sesión Trivias App'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      titulo: 'Trivias App - Registrarse',
      descripcion: 'Registro en Trivias App'
    }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(rutas) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
