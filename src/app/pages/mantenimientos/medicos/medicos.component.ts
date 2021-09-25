import { ModalImagenService } from './../../../services/modal-imagen.service';
import  Swal  from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Medico } from './../../../models/medico.model';
import { MedicoService } from './../../../services/medico.service';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public imgSubs: Subscription;

  constructor(private medicoService: MedicoService,private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    ).subscribe(img => {
      this.cargarMedicos();
    });
  }

  private cargarMedicos() {
    this.cargando = true;

    this.medicoService.getMedicos().subscribe(medicos => {
      this.medicos = medicos;
      this.medicosTemp = medicos ;
      this.cargando = false;
    }, err => {
      Swal.fire('Error', err.error.msg, 'error');
      this.cargando = false;
    });
  }

  public cargarImagen(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico.uid, medico.image);
  }
}
