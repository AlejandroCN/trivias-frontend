import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

import { environment } from '../../environments/environment';
import { FileItem } from '../models/file-item.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFirebaseService {

  private directorioCategorias = environment.directoriosFirebase.categorias;

  constructor(private storage: AngularFireStorage) { }

  subirArchivo(archivo: FileItem): AngularFireUploadTask {
    archivo.estaSubiendo = true;

    const tarea = this.storage.upload(`${this.directorioCategorias}/${archivo.nombreArchivo}`, archivo.archivo);
    tarea.percentageChanges().subscribe(porcentaje => {
      archivo.progreso = porcentaje;
      if (porcentaje >= 100) {
        archivo.estaSubiendo = false;
      }
    });
    return tarea;
  }

  public referenciaCloudStorage(nombreArchivo: string): AngularFireStorageReference {
    return this.storage.ref(`${this.directorioCategorias}/${nombreArchivo}`);
  }

}
