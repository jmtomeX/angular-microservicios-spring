import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnosComponent } from './alumnos.component';
import { CommonFormComponent } from '../common/common-form.component';
@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent extends CommonFormComponent<Alumno, AlumnoService> implements OnInit {
  private archivo: File;
  constructor(
    service: AlumnoService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, router, route);

    this.model = new Alumno();
    this.titulo = 'Crear Alumnos';
    this.redirect = '/alumnos';
    this.nombreModel = Alumno.name;
  }

  public seleccionarFoto(event): void {
    this.archivo = event.target.files[0];
    // tslint:disable-next-line:no-console
    console.info(this.archivo);
  }
}
