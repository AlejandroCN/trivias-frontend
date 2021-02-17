import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-alert',
  templateUrl: './icon-alert.component.html',
  styles: [
  ]
})
export class IconAlertComponent implements OnInit {
  @Input() public mensaje: string;
  @Input() public bgClassColor: string;
  @Input() public icono: string;
  @Input() public rutaAnterior: string;

  constructor() { }

  ngOnInit(): void {
  }

}
