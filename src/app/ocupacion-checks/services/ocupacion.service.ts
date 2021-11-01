import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TipoHabitacion} from 'src/app/ocupacion-checks/interfaces/tipo-habitacion'
@Injectable({
  providedIn: 'root'
})
export class OcupacionService {

  protected endPoint = environment.endPoint;
  protected header:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});



  constructor(private http: HttpClient) { }

  public list(): Observable<TipoHabitacion[]>{
    return this.http.get<TipoHabitacion[]>(this.endPoint+"/list");
  }

  public update(estado: string, id_tipo: number, id_habitacion: number): Observable<TipoHabitacion>{
    return this.http.put<TipoHabitacion>(this.endPoint+"/update/"+estado+"/"+id_tipo+"/"+id_habitacion, null, {headers: this.header});
  }
}
