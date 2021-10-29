import { Habitaciones } from "./habitaciones";

export interface TipoHabitacion {
    idTipoHabitacion: number; 
    nomTipoHabitacion: string;
    descTipoHabitacion: string;
    precioHabitacion: number;
    habitaciones: Habitaciones[]
}
