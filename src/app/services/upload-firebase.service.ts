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

  subirArchivo(item: FileItem): AngularFireUploadTask {
    item.estaSubiendo = true;

    const tarea = this.storage
    .upload(`${this.directorioCategorias}/${item.imagen.nombre}`, item.archivo);
    tarea.percentageChanges().subscribe(porcentaje => {
      item.progreso = porcentaje;
      if (porcentaje >= 100) {
        item.estaSubiendo = false;
      }
    });
    return tarea;
  }

  public referenciaCloudStorage(nombreArchivo: string): AngularFireStorageReference {
    return this.storage.ref(`${this.directorioCategorias}/${nombreArchivo}`);
  }

  public eliminarArchivo(nombre: string): Promise<any> {
    return this.referenciaCloudStorage(nombre).delete().toPromise();
  }

}
