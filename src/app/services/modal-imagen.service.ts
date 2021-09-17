import { environment } from 'src/environments/environment';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public tipo: 'users' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;
  public nuevaImagen: EventEmitter<string>;

  private _ocultarModal: boolean = true;

  public get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() {
    this.nuevaImagen = new EventEmitter<string>();
  }

  abrirModal(tipo: 'users' | 'medicos' | 'hospitales', id: string, img: string = 'no-img') {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${environment.base_url}/upload/${tipo}/${img}`;
    }

  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
