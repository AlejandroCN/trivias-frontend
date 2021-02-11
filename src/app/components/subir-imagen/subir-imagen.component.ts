import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileItem } from '../../models/file-item.model';
import { Imagen } from 'src/app/models/imagen.model';

import { UploadFirebaseService } from '../../services/upload-firebase.service';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css']
})
export class SubirImagenComponent implements OnInit {

  // Es la imagen existente (puede no existir)
  @Input() public imagenExistente: Imagen;

  // es la imagen que selecciona el usuario antes de subir
  public imagenSeleccionada: FileItem;
  // es la imagen seleccionada en base 64 para mostrar la vista previa
  public imagenPreVisualizada: string;

  constructor(private uploadFirebaseService: UploadFirebaseService) {
    this.imagenSeleccionada = null;
    this.imagenExistente = null;
  }

  ngOnInit(): void {
  }

  seleccionarArchivo(archivo: File): void {
    if (archivo) {
      if (archivo.type.indexOf('image') >= 0) {
        this.imagenSeleccionada = new FileItem(archivo);

        const reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onloadend = () => this.imagenPreVisualizada = reader.result as string;
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

  public async cargarImagen(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      if (this.imagenSeleccionada) {
        try {
          if (this.imagenExistente) {
            await this.uploadFirebaseService.eliminarArchivo(this.imagenExistente.nombre);
          }
          this.imagenSeleccionada.imagen.nombre = this.generarId(5) + '_' + this.imagenSeleccionada.imagen.nombre;
          await this.uploadFirebaseService.subirArchivo(this.imagenSeleccionada);
        } catch (err) {
          reject(err);
        }
        resolve({
          url: this.uploadFirebaseService.referenciaCloudStorage(this.imagenSeleccionada.imagen.nombre)
          .getDownloadURL().toPromise(),
          nombre: this.imagenSeleccionada.imagen.nombre
        });
      } else {
        reject('No se ha seleccionado ninguna imagen');
      }
    });
  }

  private generarId(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
