import { Component, OnInit } from '@angular/core';
import { CheckService } from '../check.service';
import { ListCheckIn } from './list-check-in';
import { MessageService } from "primeng/api";
import swal from'sweetalert2';

@Component({
  selector: 'app-inicio-check',
  templateUrl: './inicio-check.component.html',
  styleUrls: ['./inicio-check.component.scss']

})
export class InicioCheckComponent implements OnInit {

  public listadoCheckIn: ListCheckIn[];

  constructor(private checkService: CheckService
            , private mess: MessageService ) { }

  ngOnInit(): void {

    this.listadoCheckIn = [] as ListCheckIn[];
    this.cargarListado();

  }

  cargarListado(): void{
    this.checkService.getAllCheckIn().subscribe(
        list => {
            this.listadoCheckIn = list;
        }
    );
  }

  eliminar(listadoCheckIn: ListCheckIn): void{
    swal.fire({
      title: '¿Estas Seguro?',
      text: `¿Quieres eliminar el Check-In?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.checkService.deleteCheckIn(listadoCheckIn.id).subscribe(
          response => {
            this.listadoCheckIn = this.listadoCheckIn.filter( check => check !== listadoCheckIn)
            swal.fire(
              '¡Eliminado!',
              'El Check-In se ha eliminado con Éxito',
              'success'
            )
          }
        )
      }
    })
  }

}
