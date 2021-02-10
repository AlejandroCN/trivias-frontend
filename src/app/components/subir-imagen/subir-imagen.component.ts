import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

import { FileItem } from '../../models/file-item.model';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css']
})
export class SubirImagenComponent implements OnInit {

  @Input() public ulrImagen: string;
  @Output() private cambioImagen: EventEmitter<FileItem>;

  // es la imagen que selecciona el usuario antes de subir
  public imagenSeleccionada: File;
  // es la imagen seleccionada en base 64 para mostrar la vista previa
  public imagenPreVisualizada: string;

  constructor() {
    this.imagenSeleccionada = null;
    this.ulrImagen = null;
    this.cambioImagen = new EventEmitter();
  }

  ngOnInit(): void {
  }

  seleccionarArchivo(archivo: File): void {
    if (archivo) {
      if (archivo.type.indexOf('image') >= 0) {
        this.imagenSeleccionada = archivo;

        const reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onloadend = () => this.imagenPreVisualizada = reader.result as string;
        this.cambioImagen.emit(new FileItem(this.imagenSeleccionada));
      } else {
        this.imagenSeleccionada = null;
        Swal.fire({
          icon: 'warning',
          title: 'Atención!',
          text: 'El archivo seleccionado no es una imagen'
        });
      }
    }
  }

}
