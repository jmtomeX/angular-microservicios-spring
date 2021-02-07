import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppSettings } from '../config/app-settings';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alumno } from '../models/alumno';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno> {
  BASE_PATH = AppSettings.API_ENDPOINT;
  // al ser clase hija tiene que ser protected al igual que la clase padre ya que se está sobreescribiendo
  protected baseEndPoint = this.BASE_PATH + '/alumnos';
  // hereda de la clase padre
  constructor(http: HttpClient) {
    super(http);
   }
}
