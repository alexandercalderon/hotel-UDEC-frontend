import { Component, OnInit } from '@angular/core';
import {TipoHabitacion} from 'src/app/ocupacion-checks/interfaces/tipo-habitacion'
import {OcupacionService} from 'src/app/ocupacion-checks/services/ocupacion.service'
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.scss']
})
export class OcupacionComponent implements OnInit {

  tipoHabitaciones: TipoHabitacion[] = [];
  estado: string;
  items: MenuItem[];
  filtrado: string;

  constructor(private service: OcupacionService) { }

  ngOnInit(): void {
    this.items = [
      {label:'Ocupado', icon:'pi pi-ban' ,command:(event) => this.filtrado = event.item.label},
      {label:'Reservado', icon:'pi pi-clock',command:(event) => this.filtrado = event.item.label },
      {label:'Limpieza', icon:'pi pi-exclamation-triangle',command:(event) => this.filtrado = event.item.label},
      {label:'Disponible', icon:'pi pi-check',command:(event) => this.filtrado = event.item.label },
    ]
    this.list();
  }

  filtrar(estado: string) : void{
      this.service.filtrar(estado.substr(0,1)).subscribe(tipoHabitacion => {
        this.tipoHabitaciones = tipoHabitacion;
        this.estadoHabitacion();
      })
      console.log(this.tipoHabitaciones)
  }
  list(): void {
    this.service.list().subscribe(tipoHabitaciones => {
      this.tipoHabitaciones = tipoHabitaciones;
      this.estadoHabitacion();
    });
  }

  estadoHabitacion(): void {
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
  }



}
