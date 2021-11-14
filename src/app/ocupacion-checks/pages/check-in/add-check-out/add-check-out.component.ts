import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { CheckOut } from "src/app/ocupacion-checks/interfaces/check-out";
import { Habitaciones } from "src/app/ocupacion-checks/interfaces/habitaciones";
import { Persona } from "src/app/ocupacion-checks/interfaces/persona";
import { CheckOutService } from "src/app/ocupacion-checks/services/check-out.service";
import { Habitacion } from "../habitacion";

@Component({
    selector: "app-add-check-out",
    templateUrl: "./add-check-out.component.html",
    styleUrls: ["./add-check-out.component.scss"],
})
export class AddCheckOutComponent implements OnInit {
    checkOut: CheckOut;

    habitaciones: Habitaciones[] = [];

    persona: Persona;

    cedula: number;

    numHabitacion: number;

    constructor(
        private checkOutService: CheckOutService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.checkOut = {} as CheckOut;
        this.persona = {} as Persona;
    }

    buscarHabitacion(num: number): void {
        this.checkOutService.findByHabitacion(num).subscribe(
            (habitacion) => {
                this.habitaciones.push(habitacion);
                this.checkOut.ventas.totalVente +=
                    habitacion.tipoHabitacion.precioHabitacion;
            },
            (err) => {
                if (err.status === 404) {
                    this.messageService.add({
                        severity: "error",
                        summary: " habitacion no encontrada D:",
                        detail: "la habitacion que está buscando, no existe",
                    });
                }
            }
        );
    }
    cargarPersona(cedula: number): void {
        this.checkOutService.findPerson(cedula).subscribe(
            (person) => {
                this.persona = person;
            },
            (err) => {
                if (err === 404) {
                    this.messageService.add({
                        severity: "error",
                        summary: " persona no encontrada D:",
                        detail: "la persona que está buscando, no existe",
                    });
                }
            }
        );
    }
    crearCheckOut(): void {}
}
