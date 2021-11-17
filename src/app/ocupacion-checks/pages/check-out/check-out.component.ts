import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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

    checkOut: CheckOut;

    constructor(
        private productService: ProductService,
        private checkOutService: CheckOutService,
        private messageService: MessageService,
        private activateRouter: ActivatedRoute
    ) {}

    ngOnInit() {
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));
        this.reset();
        this.detalle();
    }
    detalle(): void {
        this.activateRouter.params.subscribe((params) => {
            this.checkOutService.findCheck(params["id"]).subscribe((check) => {
                this.checkOut = check;
            });
        });
    }
    reset(): void {
        this.checkOut = {} as CheckOut;
        this.checkOut.persona = {} as Persona;
        this.checkOut.ventas = {} as Ventas;
        this.checkOut.ventas.pago = {} as Pago;
    }
    descargar(id: number): void {
        const pdf = new jsPDF();
        const content = document.getElementById("descarga");
        pdf.html(content);
        html2canvas(content).then((canva) => {
            const img = canva.toDataURL("imgae/PNG");
            const imgprops = pdf.getImageProperties(img);
            const bufferX = 1;
            const bufferY = 1;
            const pdfiwdth = pdf.internal.pageSize.getWidth() - 1 * bufferX;
            const pdfheight = (imgprops.height * pdfiwdth) / imgprops.width;
            pdf.addImage(
                img,
                "PNG",
                bufferY,
                bufferX,
                pdfiwdth,
                pdfheight,
                undefined,
                "FAST"
            );
            return pdf;
        }).then(result => {
        pdf.output("dataurlnewwindow");
        });
        //pdf.save("check-"+id+".pdf");
    }
}
