import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {CheckOut} from "src/app/ocupacion-checks/interfaces/check-out"
import { Habitaciones } from '../interfaces/habitaciones';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  protected endPoint = environment.endPointCheckOut;
  protected header:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  

  constructor(private http: HttpClient) { }

  public find(cedula: number): Observable<CheckOut>{
    return this.http.get<CheckOut>(this.endPoint+"/find/"+cedula);
  }

  public findByHabitacion(numHabitacion: string): Observable<Habitaciones>{
    return this.http.get<Habitaciones>(this.endPoint+"/habitacion/"+numHabitacion);
  }
}
