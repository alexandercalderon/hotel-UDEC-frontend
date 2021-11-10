import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CheckIn } from './check-in';
import { PlantillaUsuario } from './plantilla-usuario';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  private urlEndPont: string = 'http://localhost:8001/check-in';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient
            , private router: Router) { }


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

  

}
