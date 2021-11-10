import { Pago } from "./pago";

export interface Ventas {
    idVenta: number;
    fecVenta: string;
    totalVente: number;
    pago: Pago;
}
