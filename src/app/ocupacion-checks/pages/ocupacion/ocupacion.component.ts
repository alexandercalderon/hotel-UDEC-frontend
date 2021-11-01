import { Component, OnInit } from '@angular/core';
import {TipoHabitacion} from 'src/app/ocupacion-checks/interfaces/tipo-habitacion'
import {OcupacionService} from 'src/app/ocupacion-checks/services/ocupacion.service'
import { environment } from 'src/environments/environment';
import { MenuItem } from 'primeng/api';
import { stringify } from '@angular/compiler/src/util';
import { Habitaciones } from '../../interfaces/habitaciones';
@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.scss']
})
export class OcupacionComponent implements OnInit {
  
  tipoHabitaciones: TipoHabitacion[] = [];
  url = environment.endPoint + '/show/';
  items: MenuItem[];
  estado: string;

  constructor(private service: OcupacionService) { }

  ngOnInit(): void {
    this.items = [
      {label:'Ocupado', icon:'pi pi-ban' ,command:(event) => this.estado = event.item.label},
      {label:'Reservado', icon:'pi pi-clock',command:(event) => this.estado = event.item.label },
      {label:'Limpieza', icon:'pi pi-exclamation-triangle',command:(event) => this.estado = event.item.label},
      {label:'Disponible', icon:'pi pi-check',command:(event) => this.estado = event.item.label },
    ]
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
    });
  }

  update(estado: string, id_tipo: number, id_habitacion: number,habitacion: Habitaciones): void{
    this.service.update(estado.substr(0,1),id_tipo, id_habitacion).subscribe(h => {
      habitacion.estado = estado;
    })
  }
  

}
