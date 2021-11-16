import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Adeudo } from "src/app/ocupacion-checks/interfaces/adeudo";
import { CheckOut } from "src/app/ocupacion-checks/interfaces/check-out";
import { Habitaciones } from "src/app/ocupacion-checks/interfaces/habitaciones";
import { Pago } from "src/app/ocupacion-checks/interfaces/pago";
import { Persona } from "src/app/ocupacion-checks/interfaces/persona";
import { Ventas } from "src/app/ocupacion-checks/interfaces/ventas";
import { CheckOutService } from "src/app/ocupacion-checks/services/check-out.service";

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

    calculado: Boolean = false;

    adeudos: Adeudo[] = [];

    pago: Pago;

    constructor(
        private checkOutService: CheckOutService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.reset();
    }

    diasEstadia(): void {
        if (
            this.checkOut.fechaEgreso != undefined &&
            this.checkOut.fechaIngreso != undefined
        ) {
            const dias =
                new Date(this.checkOut.fechaEgreso).getTime() -
                new Date(this.checkOut.fechaIngreso).getTime();
            if (dias >= 0) {
                this.checkOut.numeroDias = dias / (1000 * 60 * 60 * 24);
            } else {
                this.messageService.add({
                    severity: "error",
                    summary: " fecha imposible D:<",
                    detail: "la fecha de ingreso no puede ser despues de la de egreso >:c",
                });
                this.checkOut.numeroDias = undefined;
            }
        }
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
                if (err.status === 404) {
                    this.messageService.add({
                        severity: "error",
                        summary: " persona no encontrada D:",
                        detail: "la persona que está buscando, no existe",
                    });
                }
            }
        );
    }
    crearCheckOut(): void {
        if (
            this.habitaciones.length > 0 &&
            this.persona.identificacion != null
        ) {
            this.checkOutService
                .addVenta(this.checkOut.ventas)
                .subscribe((venta) => {
                    this.checkOutService
                        .addPago(this.pago, venta.idVenta)
                        .subscribe((checkPagado) => {
                            this.checkOutService
                                .save(
                                    this.checkOut,
                                    this.persona.idPersona,
                                    venta.idVenta
                                )
                                .subscribe((check) => {
                                    const idHabitaciones =
                                        this.habitaciones.map((habitacion) => {
                                            return habitacion.numHabitacion;
                                        });
                                    this.checkOutService
                                        .AddHabitaciones(
                                            idHabitaciones,
                                            check.id
                                        )
                                        .subscribe();
                                    this.checkOutService
                                        .AddAdeudos(this.adeudos, check.id)
                                        .subscribe();
                                    this.messageService.add({
                                        severity: "success",
                                        summary: " check out agregado :D",
                                        detail: "el check out ha sido creado ",
                                    });
                                    this.reset();
                                });
                        });
                });
        } else {
            this.messageService.add({
                severity: "warn",
                summary: " completa los datos pls uwu",
                detail: "debes completar todo el fotmato para poder crear el check out",
            });
        }
    }
    agregarAdeudo(): void {
        const newAdeudo = {} as Adeudo;
        this.adeudos.push(newAdeudo);
    }
    calcular(): void {
        this.adeudos.forEach((adeudo) => {
            this.checkOut.ventas.totalVente +=
                adeudo.precioUnitario * adeudo.importe;
        });
        this.calculado = true;
    }
    reset(): void {
        this.checkOut = {} as CheckOut;
        this.persona = {} as Persona;
        this.checkOut.ventas = {} as Ventas;
        this.checkOut.ventas.totalVente = 0;
        this.pago = {} as Pago;
        this.adeudos = [];
        this.habitaciones = [];
    }
}
