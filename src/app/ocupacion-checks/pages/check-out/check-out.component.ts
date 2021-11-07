import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Product } from "../../../demo/domain/product";
import { ProductService } from "../../../demo/service/productservice";
import { Adeudo } from "../../interfaces/adeudo";
import { CheckOut } from "../../interfaces/check-out";
import { Habitaciones } from "../../interfaces/habitaciones";
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

    constructor(
        private productService: ProductService,
        private checkOutService: CheckOutService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));
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
    reset(): void{
      this.checkOut = null;
      this.adeudos = null;
      this.habitacion = null;
    }
}
