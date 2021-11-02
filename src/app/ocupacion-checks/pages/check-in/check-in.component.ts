import { Component, OnInit } from '@angular/core';
import { PlantillaUsuario } from './plantilla-usuario';
import { CheckIn } from './check-in';
import { CheckService } from './check.service';
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
  }

  cargarUsuario(): void{
    this.checkService.getCheckInByCedula(this.plantillaUsuario).subscribe(
      c =>{
        this.checkIn = c
      }
    )
  }

}
