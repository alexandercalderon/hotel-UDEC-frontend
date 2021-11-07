import { Pago } from "./pago";

export interface Ventas {
    idVenta: number;
    fecVente: string;
    totalVenta: number;
    pago: Pago;
}
