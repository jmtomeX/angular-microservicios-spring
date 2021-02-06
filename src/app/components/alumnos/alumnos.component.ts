import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {PageEvent } from '@angular/material/paginator';

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
  totalRegistros = 0;
  totalPorPagina = 5;
  paginaActual = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  totalAlumnos: number;
  constructor(private service: AlumnoService) { }

  ngOnInit(): void {
    this.calcularRangosPaginacion();
  }
  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangosPaginacion();
  }

  // tslint:disable-next-line:typedef
  private calcularRangosPaginacion() {
    const paginaActual = this.paginaActual.toString();
    const totalPorPagina = this.totalPorPagina.toString();
    // retorna un string reactivo asíncrono
    this.service.listarPaginas(paginaActual, totalPorPagina)
      .subscribe(p => {
        this.alumnos = p.content as Alumno[]; // se pasa a un array de alumnos
        this.totalRegistros = p.totalElements as number;
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
          // this.alumnos = this.alumnos.filter(a => a !== alumno);
          this.calcularRangosPaginacion();
        });
        Swal.fire(
          `${alumno.nombre}`,
          'Borrado con exito !',
          'success');
      } else if (result.isDenied) {
        Swal.fire(
          'Usuario no eliminado.',
          '',
          'error');
      }
    });
  }

}
