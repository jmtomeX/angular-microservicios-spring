import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  titulo = 'Listado de Alumnos';
  alumnos: Alumno[] = [];
  totalAlumnos: number;
  constructor(private service: AlumnoService) { }

  ngOnInit(): void {
    // retorna un string reactivo asíncrono
    this.service.listar().subscribe(alumnos => {
      this.alumnos = alumnos;
    }
    );
  }

  public eliminar(alumno: Alumno): void {
    Swal.fire({
      title: `¿Estás seguro que deseas eliminar a ${alumno.nombre} ?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Sí, borrar a ${alumno.nombre}!`,
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.eliminar(alumno.id).subscribe(() => {
          // filtra los alumnos y no se añade el que eliminamos
          this.alumnos = this.alumnos.filter(a => a !== alumno);
        });
        Swal.fire(
          `${alumno.nombre}`,
          'Borrado con exito !',
          'success');
      } else if (result.isDenied) {
        Swal.fire(
          'Usuario no eliminado.',
          '',
          'info');
      }
    });
  }

}
