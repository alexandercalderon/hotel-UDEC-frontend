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
    
    pago = 0;

    disabled: boolean = false;

    constructor(
        private productService: ProductService,
        private checkOutService: CheckOutService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));
            this.checkOut = {} as CheckOut;
            this.checkOut.persona = {} as Persona;
            this.checkOut.ventas = {} as Ventas;
            this.checkOut.ventas.pago = {} as Pago;
            this.checkOut.ventas.totalVenta = 0;
    }

    buscar(): void {
        this.checkOutService.find(this.cedula).subscribe((checkOut) => {
            if (checkOut != null) {
                this.checkOut = checkOut;
                this.habitacion = checkOut.habitacion;
                this.adeudos = checkOut.adeudos;
                if (this.checkOut.persona.genero == "M")
                    this.checkOut.persona.genero = "Masculino";
                if (this.checkOut.persona.genero == "F")
                    this.checkOut.persona.genero = "Femenino";
            } else {
                this.messageService.add({
                    severity: "error",
                    summary: "check out no encontrado :(",
                    detail: "el check out que intenta buscar, no existe",
                });
            }
        });
    }
    reset(): void {
        this.checkOut = null;
        this.adeudos = null;
        this.habitacion = null;
    }

    findHabitacion(): void {
        this.checkOutService.findByHabitacion(this.numHabitacion).subscribe(
            (habitacion) => {
                this.habitacion.push(habitacion);
                    this.checkOut.ventas.totalVenta += habitacion.tipoHabitacion.precioHabitacion;
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
    addAdeudo(): void{
        const newAdeudo = {} as Adeudo;
        this.adeudos.push(newAdeudo)
    }
    guardar(): void{
        console.log(this.adeudos);
        console.log(this.checkOut)
    }
    calcular(): void{
        this.adeudos.forEach(adeudo =>{
            this.checkOut.ventas.totalVenta += adeudo.precioUnitario * adeudo.importe;
        });
        this.disabled = true;
    }
}
