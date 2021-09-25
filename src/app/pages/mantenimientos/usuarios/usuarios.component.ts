import { delay } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from './../../../models/user.model';
import { BusquedasService } from './../../../services/busquedas.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public from: number = 0;
  public users: User[];
  public usersTemp: User[];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private userService: UsuarioService, private busquedasService: BusquedasService, private modalImagenService: ModalImagenService) {
    this.users = [];
    this.usersTemp = [];
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    ).subscribe(img => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.userService.cargarUsuarios(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.cargando = false;
    }, err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  cambiarPagina(valor: number) {
    this.from += valor;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.users = this.usersTemp;
    } else {
      this.busquedasService.buscar('usuarios', termino).subscribe(result => {
        this.users = result.map(user => {
          return new User(user.name, user.email, '', user.image, user.google, user.role, user.uid)
        });
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }
  }

  eliminarUsuario(usuario: User) {

    if (usuario.uid === this.userService.uid) {
      return Swal.fire('Error', 'No se puede eliminar a usted mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de eliminar a ${usuario.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarUsuario(usuario).subscribe(result => {
          this.cargarUsuarios();
          Swal.fire(
            'Usuario eliminado!',
            `${usuario.name} fue eliminado`,
            'success'
          );
        });
      }
    })
  }

  cambiarRol(user: User) {
    this.userService.actualizaUsuario(user).subscribe(resp => {
    }, err => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }

  cargarImagen(user: User) {
    this.modalImagenService.abrirModal('users', user.uid, user.image);
  }
}
