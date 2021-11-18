import { Component, OnInit } from '@angular/core';
import { Habitacion } from '../habitacion';
import {SinglePersonDTO} from '../create/single-person-dto';
import { NewCheckIn } from '../create/new-check-in';
import { CheckService } from '../check.service';
import { MessageService } from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';
import swal from'sweetalert2';
import * as moment from 'moment';

@Component({
    selector: 'app-update-check-in',
    templateUrl: 'update-check-in.component.html',
    styleUrls: ['update-check-in.component.scss']
})

export class UpdateCheckIn implements OnInit {

       //Data
       public newCheckIn: NewCheckIn;

       //Temporal
       public habitaciones: Habitacion[];
       public singlePerson: SinglePersonDTO;
   
       public cedulaBuscar: number;
       public numHabitBuscar: number;
   
       public modificadorFecha1: boolean = false;
       public modificadorFecha2:boolean = true;
       public botonReset: boolean = true;

       public estaDuplicado: boolean = false;
       public personaTemporal: SinglePersonDTO;


       constructor(private checkInService: CheckService
        ,   private mess: MessageService
        ,   private router: Router
        ,   private routerActive: ActivatedRoute) { }

    ngOnInit(){
        this.habitaciones = [] as Habitacion[];
        this.singlePerson = {} as SinglePersonDTO;
        this.newCheckIn = {} as NewCheckIn;
        this.cargarDatos();
        this.modificadorFecha1 = true
    }

    cargarDatos(): void{
        this.routerActive.params.subscribe(
            params =>{
                let id = params['id'];
                if(id){
                    this.checkInService.getCheckInById(id).subscribe(
                        checkIn =>{
                            this.newCheckIn.fechaIngreso = checkIn.fechaIngreso
                            this.newCheckIn.fechaSalida = checkIn.fechaSalida
                            this.newCheckIn.numeroDias = checkIn.numeroDias
                            this.singlePerson.nombre = checkIn.usuario.nombre
                            this.singlePerson.apellido = checkIn.usuario.apellido
                            this.singlePerson.cedula = Number(checkIn.usuario.cedula)
                            this.singlePerson.direccion = checkIn.usuario.direccion
                            this.singlePerson.email = checkIn.usuario.email
                            this.singlePerson.telefono = checkIn.usuario.telefono
                            this.habitaciones = checkIn.usuario.habitaciones
                            this.personaTemporal = this.singlePerson;
                        }
                    );
                }
            }
        );
    }


    cargarPersona(identificador: number): void{
        this.checkInService.getPersona(identificador).subscribe(
            p =>{
                let per = this.singlePerson.cedula === p.cedula
                if(!per){
                    this.singlePerson = p
                    this.cedulaBuscar = null;
                }else{
                    this.cedulaBuscar = null;
                    this.singlePerson = this.personaTemporal;
                    this.mess.add({
                        severity: "error",
                        summary: "Este registro ya esta siendo usado",
                      });
                }
            },
            err =>{
                if(err.status === 404){
                    this.cedulaBuscar = null;
                    this.singlePerson = this.personaTemporal;
                    this.mess.add({
                        severity: "error",
                        summary: "Información no encontrada",
                        detail: err.error.mensaje,
                      });
                }
                if(err.status === 400){
                    this.cedulaBuscar = null;
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
                let hab = this.habitaciones.find(function (ele) { return ele.numeroHabitacion === h.numeroHabitacion; });
                if(!hab){
                    this.habitaciones.push(h);
                    this.habitaciones = this.habitaciones.filter( h => (h !== null));
                    this.numHabitBuscar = null;
                }else{
                    this.numHabitBuscar = null;
                    this.mess.add({
                        severity: "error",
                        summary: "Esta habitación ya esta agregada",
                      });
                }
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
                    this.numHabitBuscar = null;
                    this.mess.add({
                        severity: "error",
                        summary: "Error de Peticion",
                        detail: err.error.mensaje,
                      });
                }
             }
         );
     }

    updateCheckIn(): void{

        if(this.habitaciones.length > 0){

            this.newCheckIn.identificadorPersona = this.singlePerson.cedula;
            this.newCheckIn.habitaciones = this.habitaciones;

            this.routerActive.params.subscribe(
                params =>{
                    let id = params['id']
                    console.log(id)
                    if(id){
                        this.checkInService.updateCheckIn(this.newCheckIn, id).subscribe(
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

     removeHabitacion(habitacion: Habitacion): void{
        if(this.habitaciones.length > 1){
            let indice = this.habitaciones.indexOf(habitacion);
            this.habitaciones.splice(indice,1);
            this.habitaciones = this.habitaciones.filter( h => (h !== null));
            this.newCheckIn.identificadorPersona = this.singlePerson.cedula;
            this.newCheckIn.habitaciones = this.habitaciones;
            this.routerActive.params.subscribe(
                params =>{
                    let id = params['id']
                    console.log(id)
                    if(id){
                        this.checkInService.updateCheckIn(this.newCheckIn, id).subscribe(
                            response =>{
                                this.mess.add({
                                    severity: "success",
                                    summary: "Habitación Eliminada"
                                  });
                            }
                        );
                    }
                }       
            )
        }else{
            this.mess.add({
                severity: "error",
                summary: "No puedes eliminar todas las Habitaciones"
              });
        }
     }

     reset(){
        this.modificadorFecha1 = false;
        this.modificadorFecha2 = true;
        this.newCheckIn.fechaIngreso = null;
        this.newCheckIn.fechaSalida = null;
        this.newCheckIn.numeroDias = null;
        this.botonReset = true;
     }


     visibilidad(): void{

        if(this.newCheckIn.fechaIngreso && (!this.newCheckIn.fechaSalida)){
            this.modificadorFecha2 = false;
        }

        if(this.newCheckIn.fechaIngreso && this.newCheckIn.fechaSalida){
            let fecha1 = moment(this.newCheckIn.fechaIngreso);
            let fecha2 = moment(this.newCheckIn.fechaSalida)
            if(moment(fecha1).isBefore(fecha2)){
                let diferenciaDias = fecha2.diff(fecha1, 'days');
                let diferenciaMeses = fecha2.diff(fecha1, 'months');
                let diferenciaAnios = fecha2.diff(fecha1, 'years');
                if(diferenciaDias >= 0 && diferenciaMeses >=0 && diferenciaAnios >= 0){
                    this.modificadorFecha1 = true;
                    this.modificadorFecha2 = true;
                    this.botonReset = false;
                    this.newCheckIn.numeroDias = diferenciaDias;
                }else{
                    swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'No valido',
                    })
                }
            }else{
                this.newCheckIn.fechaIngreso = null;
                this.newCheckIn.fechaSalida = null;
                this.newCheckIn.numeroDias = null;
                fecha1 = undefined;
                fecha2 = undefined;
                this.modificadorFecha2 = true;
                swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'La Fecha de Salida no puede ser anterior a la Fecha de Entrada',
                })
            }
        }
     }

}