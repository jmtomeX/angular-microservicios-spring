import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../config/app-settings';
import { Examen } from '../models/examen';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen> {

  BASE_PATH = AppSettings.API_ENDPOINT;
  // al ser clase hija tiene que ser protected al igual que la clase padre ya que se está sobreescribiendo
  protected baseEndPoint = this.BASE_PATH + '/examenes';
   // hereda de la clase padre
   constructor(http: HttpClient) {
    super(http);
   }
}
