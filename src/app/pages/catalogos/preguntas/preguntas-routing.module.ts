import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarPreguntaComponent } from './registrar-pregunta/registrar-pregunta.component';
import { PreguntasComponent } from './preguntas.component';

const rutas: Routes = [
  {
    path: '',
    component: PreguntasComponent,
    data: {
      titulo: 'Preguntas',
      descripcion: 'Preguntas disponibles para realizar trivias',
      icono: 'question'
    }
  },
  {
    path: 'form-pregunta',
    component: RegistrarPreguntaComponent,
    data: {
      titulo: 'Formulario Pregunta',
      descripcion: 'Forma para dar de alta o editar una pregunta',
      icono: 'question'
    }
  },
  {
    path: 'form-pregunta/:id',
    component: RegistrarPreguntaComponent,
    data: {
      titulo: 'Formulario Pregunta',
      descripcion: 'Forma para dar de alta o editar una pregunta',
      icono: 'question'
    }
  }
]

@NgModule({
  imports: [ RouterModule.forChild(rutas) ],
  exports: [ RouterModule ]
})
export class PreguntasRoutingModule { }
