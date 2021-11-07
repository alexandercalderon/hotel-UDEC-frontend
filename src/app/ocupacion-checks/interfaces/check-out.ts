import { Adeudo } from "./adeudo";
import { Habitaciones } from "./habitaciones";
import { Persona } from "./persona";
import { Ventas } from "./ventas";

export interface CheckOut {
    id: number;
    fechaIngreso: string;
    fechaEgreso: string;
    numeroDias:  number;
    habitacion: Habitaciones[];
    adeudos: Adeudo[];
    persona: Persona;
    ventas: Ventas;
}
