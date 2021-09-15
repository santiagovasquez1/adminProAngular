import Swal from 'sweetalert2';
import { FileUploadService } from './../../services/file-upload.service';
import { User } from './../../models/user.model';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: User;
  public imagenSubir: File;
  public imgTemp: string = '';

  constructor(private fb: FormBuilder, private userService: UsuarioService, private fileUploadServices: FileUploadService) {
    this.usuario = this.userService.user;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      name: [this.usuario.name || '', Validators.required],
      email: [this.usuario.email || '', [Validators.required, Validators.email]]
    });

  }

  actualizarPerfil() {
    this.userService.actualizarPerfil(this.perfilForm.value).subscribe(result => {
      const { name, email } = this.perfilForm.value;
      this.usuario.name = name;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');

    }, err => {
      console.warn(err);
      Swal.fire('Error', err.error.msg, 'error');
    });

  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = '';
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgTemp = reader.result.toString();
      }
    }
  }

  subirImagen() {
    this.fileUploadServices.actualizarFoto(this.imagenSubir, 'users', this.usuario.uid)
      .then(img => {
        this.usuario.image = img;
        Swal.fire('Guardado', 'Imagen actualizada', 'success');
      })
      .catch(err=>{
        console.warn(err);
        Swal.fire('Error','No se puede subir la imagen', 'error');
      });
  }
}
