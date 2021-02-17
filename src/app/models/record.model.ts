import {Categoria} from './categoria.model';
import {Pregunta} from './pregunta.model';
import {Usuario} from './usuario.model';

export class Record {

  id: number;
  tiempo: number;
  totalAciertos: number;
  fecha: Date;
  usuario: Usuario;
  categoria: Categoria;
  preguntas: Pregunta[];

}
