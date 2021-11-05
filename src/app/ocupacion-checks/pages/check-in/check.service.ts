import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckIn } from './check-in';
import { PlantillaUsuario } from './plantilla-usuario';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  private urlEndPont: string = 'http://localhost:8001/check-in';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }


  getCheckInByCedula(usuario: PlantillaUsuario): Observable<CheckIn>{
    return this.http.post<CheckIn>(`${this.urlEndPont}/get/identificacion`, usuario, { headers: this.httpHeaders });
  }

}
