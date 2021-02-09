import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public nombrePropio = '[ A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$';
  public alfaNum = '([a-zA-z0-9])*$';
  public alfaNumEspaciosAcentos = '[ A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*$';

  constructor() { }
}
