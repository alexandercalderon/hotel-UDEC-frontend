import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})
export class EstadoComponent {

  @Input() estado: string;
  constructor() { }



}
