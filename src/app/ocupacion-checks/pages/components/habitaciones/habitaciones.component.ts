import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Habitaciones } from 'src/app/ocupacion-checks/interfaces/habitaciones';
import { TipoHabitacion } from 'src/app/ocupacion-checks/interfaces/tipo-habitacion';
import { OcupacionService } from 'src/app/ocupacion-checks/services/ocupacion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss']
})
export class HabitacionesComponent {

  @Input() tipoHabitaciones: TipoHabitacion[];
  items: MenuItem[];
  url = environment.endPoint + '/show/';
  estado: string;

  constructor(private service: OcupacionService) {
    this.items = [
      {label:'Ocupado', icon:'pi pi-ban' ,command:(event) => this.estado = event.item.label},
      {label:'Reservado', icon:'pi pi-clock',command:(event) => this.estado = event.item.label },
      {label:'Limpieza', icon:'pi pi-exclamation-triangle',command:(event) => this.estado = event.item.label},
      {label:'Disponible', icon:'pi pi-check',command:(event) => this.estado = event.item.label },
    ]
   }

  update(estado: string, id_tipo: number, id_habitacion: number,habitacion: Habitaciones): void{
    this.service.update(estado.substr(0,1),id_tipo, id_habitacion).subscribe(h => {
      habitacion.estado = estado;
    })
  }




}
