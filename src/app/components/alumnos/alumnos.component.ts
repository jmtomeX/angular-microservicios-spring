import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  titulo = 'Listado de Alumnos';
  alumnos: Alumno[];
  totalAlumnos: number;
  constructor(private service: AlumnoService) { }

  ngOnInit(): void {
    // retorna un string reactivo asíncrono
    this.service.listar().subscribe(alumnos => this.alumnos = alumnos );
   // this.totalAlumnos = this.alumnos.length;
  }

}
