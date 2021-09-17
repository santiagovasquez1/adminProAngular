import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FileUploadService } from './../../services/file-upload.service';
import { ModalImagenService } from './../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService, private fileUploadServices: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = '';
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgTemp = reader.result;
      }
    }
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadServices.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Imagen actualizada', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      })
      .catch(err => {
        console.warn(err);
        Swal.fire('Error', 'No se puede subir la imagen', 'error');
      });
  }

}
