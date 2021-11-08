import { ImagenesHabitacion } from "./imagenes-habitacion";
import { TipoHabitacion } from "./tipo-habitacion";

export interface Habitaciones {
    idHabitacion: number;
    numHabitacion: number;
    estado: string;
    imagenes: ImagenesHabitacion[];
    tipoHabitacion: TipoHabitacion;
}
