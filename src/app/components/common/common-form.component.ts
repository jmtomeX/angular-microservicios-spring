import { Component, Directive, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonService } from '../../services/common.service';
import { Generic } from '../../models/generic';
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class CommonFormComponent<Model extends Generic, S extends CommonService<Model>> implements OnInit {
 // No se puede instanciar aquí
  model: Model;
  error: any;
  titulo: string;
  protected redirect: string;
  protected nombreModel: string;
  constructor(
    protected service: S,
    protected router: Router,
    protected route: ActivatedRoute) { }
  ngOnInit(): void {
    // recogemos el id
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id'); // con + castea a number
      if (id) {
        this.service.ver(id).subscribe(model => this.model = model);
      }
    })
  }

  public crear(): void {
    this.service.crear(this.model).subscribe(model => {
      console.log(model);
      Swal.fire('Formulario de creación', `${this.nombreModel} ${model.nombre} creado correctamente.`, 'success');
      // alert(`Alumno ${model.nombre} creado correctamente.`);
      this.router.navigate([this.redirect]);
    }, err => {
      if (err.status === 400) { // error asignado a la validación
        this.error = err.error;
      }
    });
  }
  public editar(): void {
    this.service.editar(this.model).subscribe(model => {
      console.log(model);
      Swal.fire('Formulario de edición', `${this.nombreModel} ${model.nombre} editado correctamente.`, 'success');
      // alert(`Alumno ${model.nombre} creado correctamente.`);
      this.router.navigate([this.redirect]);
    }, err => {
      if (err.status === 400) { // error asignado a la validación
        this.error = err.error;
      }
    });
  }

}
