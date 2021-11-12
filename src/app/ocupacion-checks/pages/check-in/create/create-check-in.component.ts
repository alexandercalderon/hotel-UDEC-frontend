import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import { Habitacion } from '../habitacion';
import {SinglePersonDTO} from './single-person-dto';
import { NewCheckIn } from './new-check-in';
import { CheckService } from '../check.service';
import { MessageService } from "primeng/api";
import { Router } from '@angular/router';
import swal from'sweetalert2';


@Component({
    selector: 'app-create-check-in',
    templateUrl: 'create-check-in.component.html',
    styleUrls: ['create-check-in.component.scss']
})

export class CreateCheckIn implements OnInit {

    //Data
    public newCheckIn: NewCheckIn;

    //Temporal
    public habitaciones: Habitacion[];
    public singlePerson: SinglePersonDTO;

    public cedulaBuscar: number;
    public numHabitBuscar: number;

    constructor(private checkInService: CheckService
            ,   private mess: MessageService
            ,   private router: Router) { }sww

    ngOnInit() {
        this.habitaciones = [] as Habitacion[];
        this.singlePerson = {} as SinglePersonDTO;
        this.newCheckIn = {} as NewCheckIn;
     }


     cargarPersona(identificador: number): void{
        this.checkInService.getPersona(identificador).subscribe(
            p =>{
                this.singlePerson = p
                this.cedulaBuscar = null;
            },
            err =>{
                if(err.status === 404){
                    this.cedulaBuscar = null;
                    this.singlePerson = {} as SinglePersonDTO;
                    this.mess.add({
                        severity: "error",
                        summary: "Información no encontrada",
                        detail: err.error.mensaje,
                      });
                }
                if(err.status === 400){
                    this.singlePerson = {} as SinglePersonDTO;
                    this.mess.add({
                        severity: "error",
                        summary: "Error de Peticion",
                        detail: err.error.mensaje,
                      });
                }
            }
        );
     }

     cargarHabitacion(numHabitacion: number): void{
         this.checkInService.getHabitacion(numHabitacion).subscribe(
             h =>{
                this.habitaciones.push(h);
                this.habitaciones = this.habitaciones.filter( h => (h !== null));
                this.numHabitBuscar = null;
             },
             err =>{
                if(err.status == 404){
                    this.numHabitBuscar = null;
                    this.mess.add({
                        severity: "error",
                        summary: "Información no encontrada",
                        detail: err.error.mensaje,
                      });
                }
                if(err.status == 400){
                    this.mess.add({
                        severity: "error",
                        summary: "Error de Peticion",
                        detail: err.error.mensaje,
                      });
                }
             }
         );
     }


     crearCheckIn(): void{
        if(this.habitaciones.length > 0){
            this.newCheckIn.identificadorPersona = this.singlePerson.cedula;
            this.newCheckIn.habitaciones = this.habitaciones;
            console.log(this.newCheckIn);
            console.log(this.newCheckIn.fechaIngreso)
            console.log(this.newCheckIn.fechaSalida)
            console.log(this.newCheckIn.numeroDias)
            this.checkInService.createCheckIn(this.newCheckIn).subscribe(
                mes =>{
                    this.router.navigate(['/check-in'])
                    swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: mes,
                        showConfirmButton: false,
                        timer: 1500
                      })
                },
                err =>{
                    swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: err.error.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                      })
                    if(err.status == 400){
                        swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Debe llenar todos los campos',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                }
            )
        }else{
            swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Debe llenar todos los campos',
                showConfirmButton: false,
                timer: 1500
              })
        }
 
     }

}