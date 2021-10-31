import { Habitacion } from './habitacion';

export class Usuario {

    public id:number;
    public cedula:string;
    public nombre:string;
    public apellido:string;
    public direccion:string;
    public ciudad:string;
    public email:string;
    public telefono:string;
    public habitaciones: Habitacion[];


}
