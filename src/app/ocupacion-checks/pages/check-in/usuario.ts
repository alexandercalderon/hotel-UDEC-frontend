import { Habitacion } from './habitacion';

export interface Usuario {

    id?:number;
    cedula?:string;
    nombre?:string;
    apellido?:string;
    direccion?:string;
    ciudad?:string;
    email?:string;
    telefono?:string;
    habitaciones?: Habitacion[];


}
