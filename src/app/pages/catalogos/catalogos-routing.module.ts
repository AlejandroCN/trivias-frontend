import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './categorias/categorias.component';
import { FormCategoriaComponent } from './form-categoria/form-categoria.component';

const rutas: Routes = [
  {
    path: 'categorias',
    component: CategoriasComponent,
    data: {
      titulo: 'Categorías',
      descripcion: 'Clasificadores para las preguntas de la aplicación',
      icono: 'object-group'
    }
  },
  {
    path: 'form-categoria',
    component: FormCategoriaComponent,
    data: {
      titulo: 'Formulario Categoría',
      descripcion: 'Forma para dar de alta o editar una categoría',
      icono: 'object-group'
    }
  },
  {
    path: 'form-categoria/:id',
    component: FormCategoriaComponent,
    data: {
      titulo: 'Formulario Categoría',
      descripcion: 'Forma para dar de alta o editar una categoría',
      icono: 'object-group'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(rutas) ],
  exports: [ RouterModule ]
})
export class CatalogosRoutingModule { }
