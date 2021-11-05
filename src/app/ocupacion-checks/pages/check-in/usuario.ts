import { Habitacion } from './habitacion';

export interface Usuario {

    id?:number;
    cedula?:string;
    nombre?:string;
    apellido?:string;
    direccion?:string;
    email?:string;
    telefono?:string;
    genero?:string;
    habitaciones?: Habitacion[];

}
