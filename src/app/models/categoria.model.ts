import { Imagen } from './imagen.model';

export class Categoria {

  id: number;
  categoria: string;
  descripcion: string;
  imagen: Imagen;

  constructor() {
    this.imagen = new Imagen();
  }

}
