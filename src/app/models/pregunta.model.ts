import { Categoria } from './categoria.model';
import { Respuesta } from './respuesta.model';

export class Pregunta {

  id: number;
  pregunta: string;
  respuestas: Respuesta[];
  categoria: Categoria;

}
