
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';

// El modelo extiende del interface Generic
export abstract class CommonService<Model extends Generic> {

  protected baseEndPoint: string;
  protected cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient) {
  }

  public listar(): Observable<Model[]> {
    // Forma corta de modificar el flujo
    return this.http.get<Model[]>(this.baseEndPoint);
    // Forma larga con map
    // return this.http.get(this.baseEndPoint).pipe(
    //   // se convierte la lista entera de una sola vez
    //   map(alumnos => alumnos as Model[]) // casteado
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
  public ver(id: number): Observable<Model> {
    return this.http.get<Model>(`${this.baseEndPoint}/${id}`);
  }
  public crear(model: Model): Observable<Model> {
    return this.http.post<Model>(this.baseEndPoint, model,
      { headers: this.cabeceras });
  }
  public editar(model: Model): Observable<Model> {
    return this.http.put<Model>(`${this.baseEndPoint}/${model.id}`,
      model,
      { headers: this.cabeceras });
  }
  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndPoint}/${id}`);
  }

}
