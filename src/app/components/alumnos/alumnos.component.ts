import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator, PageEvent } from '@angular/material/paginator';

import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from '../../models/alumno';
import { CommonService } from '../../services/common.service';

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

  // cambiar texto del paginador
  @ViewChild(MatPaginator) paginator;

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
    // retorna un string reactivo asíncrono
    this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString())
      .subscribe(p => {
        this.alumnos = p.content as Alumno[]; // se pasa a un array de alumnos
        this.totalRegistros = p.totalElements as number;
        // traducir paginación
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente página';
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.previousPageLabel = 'Anterior página';
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
