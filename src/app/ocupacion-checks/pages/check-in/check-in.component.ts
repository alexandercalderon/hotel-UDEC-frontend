import { Component, OnInit } from '@angular/core';
import { PlantillaUsuario } from './plantilla-usuario';
import { CheckIn } from './check-in';
import { CheckService } from './check.service';
import { Usuario } from './usuario';
import { Habitaciones } from '../../interfaces/habitaciones';
@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  public plantillaUsuario : PlantillaUsuario;
  
  public checkIn: CheckIn;

  constructor(private checkService: CheckService) { }

  ngOnInit(): void {
    this.plantillaUsuario = {} as PlantillaUsuario;
    this.checkIn = {} as CheckIn;
    this.checkIn.usuario = {} as Usuario;
    this.checkIn.usuario.habitaciones = [] as Habitaciones[];
    this.checkIn.usuario.habitaciones[0] = {} as Habitaciones;
  }

  cargarUsuario(): void{
    this.checkService.getCheckInByCedula(this.plantillaUsuario).subscribe(
      c =>{
        this.checkIn = c
      }
    )
  }

}
