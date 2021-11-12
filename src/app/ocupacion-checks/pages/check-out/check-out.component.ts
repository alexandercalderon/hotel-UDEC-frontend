import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Product } from "../../../demo/domain/product";
import { ProductService } from "../../../demo/service/productservice";
import { Adeudo } from "../../interfaces/adeudo";
import { CheckOut } from "../../interfaces/check-out";
import { Habitaciones } from "../../interfaces/habitaciones";
import { Pago } from "../../interfaces/pago";
import { Persona } from "../../interfaces/persona";
import { Ventas } from "../../interfaces/ventas";
import { CheckOutService } from "../../services/check-out.service";

@Component({
    selector: "app-check-out",
    templateUrl: "./check-out.component.html",
    styleUrls: ["./check-out.component.scss"],
})
export class CheckOutComponent implements OnInit {
    products: Product[];

    cedula: number;

    checkOut: CheckOut;

    adeudos: Adeudo[] = [];

    habitacion: Habitaciones[] = [];

    numHabitacion: string;

    disabled: boolean = false;

    pago: Pago;

    constructor(
        private productService: ProductService,
        private checkOutService: CheckOutService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));
            this.reset();
    }
    buscar(): void {
        if(this.cedula==null){
            this.messageService.add({
                severity: "error",
                summary: "check out no encontrado",
                detail: "el check out que intenta buscar no existe",
            });
        }
        this.checkOutService.find(this.cedula).subscribe((checkOut) => {
            if (checkOut != null) {
                this.checkOut = checkOut;
                this.habitacion = checkOut.habitacion;
                this.adeudos = checkOut.adeudos;
                this.pago =checkOut.ventas.pago;
                if (this.checkOut.persona.genero == "M")
                    this.checkOut.persona.genero = "Masculino";
                if (this.checkOut.persona.genero == "F")
                    this.checkOut.persona.genero = "Femenino";
                this.disabled=true;
            } else {
                this.messageService.add({
                    severity: "error",
                    summary: "check out no encontrado",
                    detail: "el check out que intenta buscar no existe",
                });
            }
        });
    }
    reset(): void {
        this.cedula = null;
        this.checkOut = {} as CheckOut;
        this.checkOut.persona = {} as Persona;
        this.checkOut.ventas = {} as Ventas;
        this.checkOut.ventas.totalVente = 0;
        this.pago = {} as Pago;
        this.adeudos = [];
        this.habitacion = [];
    }
    findHabitacion(): void {
        this.checkOutService.findByHabitacion(this.numHabitacion).subscribe(
            (habitacion) => {
                this.habitacion.push(habitacion);
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
    addAdeudo(): void {
        const newAdeudo = {} as Adeudo;
        this.adeudos.push(newAdeudo);
    }
    guardar(): void {
        if(this.cedula==null){
            this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "No se ha podido guardar, digite la cedula de nuevo",
            });
        }else{
            this.checkOutService.addPerson(this.checkOut.persona).subscribe(
                (person) => {
                    this.checkOutService
                        .addVenta(this.checkOut.ventas)
                        .subscribe((venta) => {
                            this.checkOutService
                                .addPago(this.pago, venta.idVenta)
                                .subscribe((ventaPagada) => {
                                    this.checkOutService.save(this.checkOut, person.idPersona, venta.idVenta).subscribe(check => {
                                        this.habitacion.forEach(hab => {
                                            this.checkOutService.AddHabitaciones(hab.idHabitacion, check.id).subscribe(); 
                                        })
                                        this.checkOutService.AddAdeudos(this.adeudos, check.id).subscribe(check => {
                                            console.log(check);
                                        })
                                    });
                                });
                        });
                },
                (err) => {
                    console.log(err);
                }
            );
            this.messageService.add({
                severity: "success",
                summary: "Guardado",
                detail: "El check out se ha guardado correctamente",
            });
        }
    }
    calcular(): void {
        this.adeudos.forEach((adeudo) => {
            this.checkOut.ventas.totalVente +=
                adeudo.precioUnitario * adeudo.importe;
        });
        this.disabled=true;
    }
}
