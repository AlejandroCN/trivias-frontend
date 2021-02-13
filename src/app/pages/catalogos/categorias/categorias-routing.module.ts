import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './categorias.component';
import { RegistrarCategoriaComponent } from './registrar-categoria/registrar-categoria.component';

const rutas: Routes = [
  {
    path: '',
    component: CategoriasComponent,
    data: {
      titulo: 'Categorías',
      descripcion: 'Clasificadores para las preguntas de la aplicación',
      icono: 'object-group'
    }
  },
  {
    path: 'form-categoria',
    component: RegistrarCategoriaComponent,
    data: {
      titulo: 'Formulario Categoría',
      descripcion: 'Forma para dar de alta o editar una categoría',
      icono: 'object-group'
    }
  },
  {
    path: 'form-categoria/:id',
    component: RegistrarCategoriaComponent,
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
export class CategoriasRoutingModule { }
