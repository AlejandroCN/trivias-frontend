import { Imagen } from './imagen.model';

export class FileItem {

  public archivo: File;
  public imagen: Imagen;
  public estaSubiendo: boolean;
  public progreso: number;

  constructor( archivo: File ) {
    this.imagen = new Imagen();

    this.archivo = archivo;
    this.imagen.nombre = archivo.name;
    this.estaSubiendo = false;
    this.progreso = 0;
  }

}
