import { Component, OnInit } from '@angular/core';
import {TipoHabitacion} from 'src/app/ocupacion-checks/interfaces/tipo-habitacion'
import {OcupacionService} from 'src/app/ocupacion-checks/services/ocupacion.service'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.scss']
})
export class OcupacionComponent implements OnInit {
  
  tipoHabitaciones: TipoHabitacion[] = [];
  url = environment.endPoint + '/show/';


  constructor(private service: OcupacionService) { }

  ngOnInit(): void {
    this.service.list().subscribe(tipoHabitaciones => {
      this.tipoHabitaciones = tipoHabitaciones;
      this.tipoHabitaciones.forEach(tipo => {
        tipo.habitaciones.map(habitacion => {
          switch(habitacion.estado){
            case 'D': {
                habitacion.estado='Disponible' 
              break;
            }
            case 'O': {
                habitacion.estado='Ocupado' 
              break;
            }
            case 'R': {
                habitacion.estado='Reservado' 
              break;
            }
            case 'L': {
                habitacion.estado='Limpieza' 
              break;
            }
          }
        });
        
      });
      console.log(this.tipoHabitaciones)
    });
  }

}
