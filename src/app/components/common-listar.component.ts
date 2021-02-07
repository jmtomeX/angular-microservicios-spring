import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator, PageEvent } from '@angular/material/paginator';

import { AlumnoService } from 'src/app/services/alumno.service';
import { CommonService } from '../services/common.service';
import { Generic } from '../models/generic';

export abstract class CommonListarComponent<Model extends Generic, S extends CommonService<Model>> implements OnInit {
  titulo: string;
  lista: Model[] = [];
  totalRegistros = 0;
  totalPorPagina = 5;
  paginaActual = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  protected nombreModel: string;

  // cambiar texto del paginador
  @ViewChild(MatPaginator) paginator;

  totalAlumnos: number;
  constructor(protected service: S) { }

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
        this.lista = p.content as Model[]; // se pasa a un array de alumnos
        this.totalRegistros = p.totalElements as number;
        // traducir paginación, se podría traducir en el archivo paginator
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente página';
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.previousPageLabel = 'Anterior página';
      }
      );
  }

  public eliminar(model: Model): void {
    Swal.fire({
      title: `¿Estás seguro que deseas eliminar a ${model.nombre} ?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Sí, borrar a ${model.nombre}!`,
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.eliminar(model.id).subscribe(() => {
          // filtra los alumnos y no se añade el que eliminamos
          // this.alumnos = this.alumnos.filter(a => a !== model);
          this.calcularRangosPaginacion();
        });
        Swal.fire(
          `${model.nombre}`,
          `${this.nombreModel} borrado con exito !`,
          'success');
      } else if (result.isDenied) {
        Swal.fire(
          `${this.nombreModel}  no eliminado.`,
          '',
          'error');
      }
    });
  }

}
