import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppSettings } from '../config/app-settings';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alumno } from '../models/alumno';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  BASE_PATH = AppSettings.API_ENDPOINT;
  private baseEndPoint = this.BASE_PATH + '/alumnos';

  private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {
  }

  public listar(): Observable<Alumno[]> {
    // Forma corta de modificar el flujo
    return this.http.get<Alumno[]>(this.baseEndPoint);
    // Forma larga con map
    // return this.http.get(this.baseEndPoint).pipe(
    //   // se convierte la lista entera de una sola vez
    //   map(alumnos => alumnos as Alumno[]) // casteado
    // );
  }

  public listarPaginas(page: string, size: string): Observable<any> {
    // cada vez que se crea una instancia la instacia original se pierde, por lo que hay llamarla de forma
    // encadenada con set en base a la misma instancia
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    // seria lo mismo
    /*
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('size', size);
    */
    return this.http.get<any>(`${this.baseEndPoint}/pagina`, { params });
  }
  public ver(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.baseEndPoint}/${id}`);
  }
  public crear(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.baseEndPoint, alumno,
      { headers: this.cabeceras });
  }
  public editar(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.baseEndPoint}/${alumno.id}`,
      alumno,
      { headers: this.cabeceras });
  }
  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndPoint}/${id}`);
  }

}
