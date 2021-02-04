import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent implements OnInit {
  alumno: Alumno = new Alumno();
  titulo = 'Crear Alumnos';
  constructor(private service: AlumnoService, private router: Router) { }
  ngOnInit(): void {
  }

  public crear(): void {
    this.service.crear(this.alumno).subscribe(alumno => {
      console.log(alumno);
      Swal.fire('Formulario de contacto', `Alumno ${alumno.nombre} creado correctamente.`, 'success');
     // alert(`Alumno ${alumno.nombre} creado correctamente.`);
      this.router.navigate(['/alumnos']);
    });
  }

}
