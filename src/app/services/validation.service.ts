import { Injectable } from '@angular/core';
import { FormArray, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public nombrePropio = '[ A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$';
  public alfaNum = '([a-zA-z0-9])*$';
  public alfaNumEspaciosAcentos = '[ A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*$';
  public pregunta = '[ A-Za-z0-9ñ¿?ÑáéíóúÁÉÍÓÚ\s]*$';

  constructor() { }

  public respuestaSeleccionada(): ValidatorFn {
    return (array: FormArray): { [key: string]: boolean } | null => {
      if (array.controls.find(ctrl => ctrl.value)) {
        return null;
      } else {
        console.log('Respuesta no seleccionada');
        return {respuestaNoSeleccionada: true};
      }
    };
  }

}
