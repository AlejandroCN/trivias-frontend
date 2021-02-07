import { NgModule } from '@angular/core';

import { CategoriasComponent } from './categorias/categorias.component';
import { CatalogosRoutingModule } from './catalogos-routing.module';

@NgModule({
  declarations: [
    CategoriasComponent
  ],
  imports: [
    CatalogosRoutingModule
  ]
})
export class CatalogosModule { }
