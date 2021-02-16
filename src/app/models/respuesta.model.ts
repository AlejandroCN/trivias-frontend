export class Respuesta {

  id: number;
  respuesta: string;
  correcta: boolean;
  seleccionada?: boolean;

  constructor() {
    this.id = 0;
    this.respuesta = '';
    this.correcta = false;
  }

}
