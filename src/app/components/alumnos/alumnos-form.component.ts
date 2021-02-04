import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnosComponent } from './alumnos.component';


@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent implements OnInit {
  alumno: Alumno = new Alumno();

  error: any;
  titulo = 'Crear Alumnos';
  constructor(
    private service: AlumnoService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    // recogemos el id 
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id'); // con + castea a number
      if (id) {
        this.service.ver(id).subscribe(alumno => this.alumno = alumno);
      }
    })
  }

  public crear(): void {
    this.service.crear(this.alumno).subscribe(alumno => {
      console.log(alumno);
      Swal.fire('Formulario de creación', `Alumno ${alumno.nombre} creado correctamente.`, 'success');
      // alert(`Alumno ${alumno.nombre} creado correctamente.`);
      this.router.navigate(['/alumnos']);
    }, err => {
      if (err.status === 400) { // error asignado a la validación
        this.error = err.error;
      }
    });
  }
  public editar(): void {
    this.service.editar(this.alumno).subscribe(alumno => {
      console.log(alumno);
      Swal.fire('Formulario de edición', `Alumno ${alumno.nombre} editado correctamente.`, 'success');
      // alert(`Alumno ${alumno.nombre} creado correctamente.`);
      this.router.navigate(['/alumnos']);
    }, err => {
      if (err.status === 400) { // error asignado a la validación
        this.error = err.error;
      }
    });
  }

}
