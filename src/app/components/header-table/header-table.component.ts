import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-table',
  templateUrl: './header-table.component.html',
  styles: []
})
export class HeaderTableComponent implements OnInit {

  // arreglo de opciones para seleccionar el tamaño de página
  @Input() public itemsPorPagina: number[];
  // titulo para el boton de agregar
  @Input() public labelBotonAdd: string;
  // indica si se renderiza o no el boton de agregar
  @Input() public displayBotonAdd: boolean;

  // eventos para manejar en el componente padre
  @Output() cambioTamPag: EventEmitter<number>;
  @Output() cambioTermino: EventEmitter<string>;
  @Output() clickAdd: EventEmitter<any>;

  // control para el selector de tamaño de página y para el input de busqueda
  public selectTam: FormControl;
  public controlTermino: FormControl;

  // texto que se vaya escribiendo en el input de busqueda
  public termino: string;
  public faPlus = faPlus;

  constructor() {
    this.termino = '';
    this.displayBotonAdd = false;
    this.selectTam = new FormControl('');
    this.controlTermino = new FormControl('');

    this.cambioTamPag = new EventEmitter();
    this.cambioTermino = new EventEmitter();
    this.clickAdd = new EventEmitter();
  }

  ngOnInit(): void {
    this.controlTermino.valueChanges.subscribe((val: string) => this.emitirCambioTermino(val));
    this.selectTam.valueChanges.subscribe((val: string) => this.emitirCambioTam(Number(val)));
  }

  emitirCambioTam(value: number): void {
    this.cambioTamPag.emit(value);
  }

  emitirCambioTermino(term: string): void {
    this.cambioTermino.emit(term);
  }

  emitirCambioAdd(): void {
    this.clickAdd.emit(true);
  }

}
