import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {CheckOut} from "src/app/ocupacion-checks/interfaces/check-out"
import { Habitaciones } from '../interfaces/habitaciones';
import { Persona } from '../interfaces/persona';
import { Ventas } from '../interfaces/ventas';
import { Pago } from '../interfaces/pago';
import { Adeudo } from '../interfaces/adeudo';

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

  public findByHabitacion(numHabitacion: number): Observable<Habitaciones>{
    return this.http.get<Habitaciones>(this.endPoint+"/habitacion/"+numHabitacion);
  }

  public addPerson(persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(this.endPoint+"/addPerson", persona, {headers: this.header});
  }
  
  public addVenta(venta: Ventas): Observable<Ventas>{
    return this.http.post<Ventas>(this.endPoint+"/addVentas", venta, {headers: this.header});
  }
  public addPago(pago: Pago, id: number): Observable<Ventas>{
    return this.http.put<Ventas>(this.endPoint+"/add-pago/"+id,pago,{headers:this.header});
  }

  public save(checkOut: CheckOut, idPersona:number, idVenta: number): Observable<CheckOut>{
    return this.http.post<CheckOut>(this.endPoint+"/save/"+idVenta+"/"+idPersona, checkOut, {headers:this.header});
  }
  public AddHabitaciones(idHabitacion:number, id:number): Observable<CheckOut>{
    return this.http.put<CheckOut>(this.endPoint+"/add-habitaciones/"+id+"/"+idHabitacion,null,{headers: this.header});
  }
  public AddAdeudos(adeudos: Adeudo[], id:number): Observable<CheckOut>{
      return this.http.put<CheckOut>(this.endPoint+"/add-adeudos/"+id,adeudos,{headers:this.header});
  }
}
