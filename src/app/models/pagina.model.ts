export class Pagina {

  numPagina: number;
  tamPagina: number;
  direccion: boolean;
  atributo: string;
  termino: string;
  totalElementos: number;

  // valores por defecto al instanciar una pagina
  constructor() {
    this.numPagina = 1;
    this.tamPagina = 5;
    this.direccion = true;
    this.atributo = '';
    this.termino = '';
    this.totalElementos = 0;
  }

  // restablece algunos valores por defecto
  reset() {
    this.numPagina = 1;
    this.direccion = true;
    this.termino = '';
    this.totalElementos = 0;
  }

}
