import {Habitacion} from '../habitacion';

export interface NewCheckIn {
    numeroDias?: number;
    fechaIngreso?: string;
    fechaSalida?: string;
    identificadorPersona?: number;
    habitaciones?: Habitacion[];
}


