import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './categorias/categorias.component';
import { FormPreguntaComponent } from './form-pregunta/form-pregunta.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { RegistrarCategoriaComponent } from './registrar-categoria/registrar-categoria.component';

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
  },
  {
    path: 'preguntas',
    component: PreguntasComponent,
    data: {
      titulo: 'Preguntas',
      descripcion: 'Preguntas disponibles para realizar trivias',
      icono: 'question'
    }
  },
  {
    path: 'form-pregunta',
    component: FormPreguntaComponent,
    data: {
      titulo: 'Formulario Pregunta',
      descripcion: 'Forma para dar de alta o editar una pregunta',
      icono: 'question'
    }
  },
  {
    path: 'form-pregunta/:id',
    component: FormPreguntaComponent,
    data: {
      titulo: 'Formulario Pregunta',
      descripcion: 'Forma para dar de alta o editar una pregunta',
      icono: 'question'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(rutas) ],
  exports: [ RouterModule ]
})
export class CatalogosRoutingModule { }
