import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CheckIn } from './check-in';
import { PlantillaUsuario } from './plantilla-usuario';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ListCheckIn } from './home/list-check-in';
import { formatDate } from '@angular/common';
import { MessageService } from "primeng/api";
import swal from'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  private urlEndPont: string = 'http://localhost:8001/check-in';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient
            , private router: Router
            , private mess: MessageService) { }


  //Check-in por la cedula del usuario
  getCheckInByCedula(usuario: PlantillaUsuario): Observable<CheckIn>{
    return this.http.post<CheckIn>(`${this.urlEndPont}/get/identificacion`, usuario, { headers: this.httpHeaders })
    .pipe(
      map( (response: any) => response.checkInDTO as CheckIn ),
      catchError(e =>{
        if(e.status == 404){
          return throwError(e)
        }
      }) 
    )
  }

  //Check-in por el Id
  getCheckInById(id: number): Observable<CheckIn>{
    return this.http.get<CheckIn>(`${this.urlEndPont}/get/${id}`).pipe(
      map( (resp: any) =>{
        console.log(resp.checkIn)
        return resp.checkIn as CheckIn;
      }),
      catchError(e =>{
        return throwError(e);
      })
    );
  }

  //Listado de Check-ins
  getAllCheckIn(): Observable<ListCheckIn[]>{
    return this.http.get<ListCheckIn[]>(`${this.urlEndPont}/all`).pipe(
      map(response =>{
        let listado = response as ListCheckIn[];
        return listado.map(li =>{
          li.fechaIngreso = formatDate(li.fechaIngreso, 'EEEE dd, MMMM yyyy', 'es-CO');
          li.fechaSalida = formatDate(li.fechaSalida, 'EEEE dd, MMMM yyyy', 'es-CO');
          return li;
        })
      })
    )
  }

  deleteCheckIn(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPont}/delete/${id}`).pipe(
      map( (response: any) =>{
          return response.mensaje as string;
        }
      ),
      catchError(e =>{
        console.log(e.error.mensaje);
        swal.fire(
          'Error',
           e.error.error,
          'error'
        );
        return throwError(e);
        })
    )}

}
