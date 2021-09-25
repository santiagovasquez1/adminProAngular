import { Subscription } from 'rxjs';
import { ModalImagenService } from './../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { Hospital } from './../../../models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService, private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    ).subscribe(img => {
      this.cargarHospitales();
    });
  }

  private cargarHospitales() {
    this.cargando = true;

    this.hospitalService.getHospitales().subscribe(hospitales => {
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
      this.cargando = false;
    }, error => {
      console.log(error);
    });
  }

  public actualizarHospital(hospital: Hospital) {

    this.hospitalService.actualizarHospital(hospital._id, hospital.name).subscribe(result => {
      Swal.fire('Hospital actualizado', hospital.name, 'success');
    }, error => {
      Swal.fire('Error de actualizacion', error.error.message, 'error');
    });

  }

  public eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id).subscribe(result => {
      Swal.fire('Hospital borrado', hospital.name, 'success');
      this.cargarHospitales();
    }, error => {
      Swal.fire('Error de borrado', error.error.message, 'error');
    });
  }

  async abrirSwalModal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Creacion de Hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((result: any) => {
        this.hospitales.push(result.hospital);
      }, error => {
        Swal.fire('Error de borrado', error.error.message, 'error');
      });
    }

  }

  public cargarImagen(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.image);
  }

  public buscarHospital(termino: string) {
    if (termino.length === 0) {
      return this.hospitales = this.hospitalesTemp;
    } else {
      this.busquedasService.buscar('hospitales', termino).subscribe(result => {
        this.hospitales = result.map(hospital => {
          return new Hospital(hospital.name, hospital._id, hospital.image);
        });
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }
  }
}
