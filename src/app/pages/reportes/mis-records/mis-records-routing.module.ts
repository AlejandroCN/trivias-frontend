import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisRecordsComponent } from './mis-records.component';

const rutas: Routes = [
  {
    path: '',
    component: MisRecordsComponent,
    data: {
      titulo: 'Mis Records',
      icono: 'gamepad',
      descripcion: 'Consulta de los records obtenidos por el jugador',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class MisRecordsRoutingModule {}
