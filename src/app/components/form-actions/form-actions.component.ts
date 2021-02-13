import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-actions',
  templateUrl: './form-actions.component.html',
  styles: [
  ]
})
export class FormActionsComponent implements OnInit {

  @Input() public procesando: boolean;
  @Input() public rutaAnterior: string;
  @Input() public labelAction: string;

  @Output() public action: EventEmitter<boolean>

  constructor() {
    this.action = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onClickAction(): void {
    this.action.emit(true);
  }

}
