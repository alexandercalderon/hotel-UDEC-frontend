import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import { Habitacion } from '../habitacion';

@Component({
    selector: 'app-create-check-in',
    templateUrl: 'create-check-in.component.html',
    styleUrls: ['create-check-in.component.scss']
})

export class CreateCheckIn implements OnInit {

    public habitaciones: Habitacion[];

    constructor() { }

    ngOnInit() {
        this.habitaciones = [] as Habitacion[];
     }
}