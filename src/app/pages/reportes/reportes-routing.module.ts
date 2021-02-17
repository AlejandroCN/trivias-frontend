import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const rutas: Routes = [
  {
    path: 'mis-records',
    loadChildren: () =>
      import('./mis-records/mis-records.module').then(
        (m) => m.MisRecordsModule
      ),
  },

  // agregar ruta '' que redireccione a 'top-ten'
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
