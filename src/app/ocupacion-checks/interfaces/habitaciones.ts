import { ImagenesHabitacion } from "./imagenes-habitacion";

export interface Habitaciones {
    idHabitacion: number;
    numHabitacion: number;
    estado: string;
    imagenes: ImagenesHabitacion[];
}
