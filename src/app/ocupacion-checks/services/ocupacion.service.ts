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

  constructor(private http: HttpClient) { }

  public list(): Observable<TipoHabitacion[]>{
    return this.http.get<TipoHabitacion[]>(this.endPoint+"/list");
  }
}
