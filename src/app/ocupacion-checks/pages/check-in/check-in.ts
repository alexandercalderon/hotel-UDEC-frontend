import { Usuario } from './usuario';

export interface CheckIn {

    id?: number;
    numeroDias?: number;
    fechaIngreso?: string;
    fechaSalida?: string;
    usuario?: Usuario;

}
