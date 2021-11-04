import { Component, OnInit } from '@angular/core';
import { PlantillaUsuario } from './plantilla-usuario';
import { CheckIn } from './check-in';
import { CheckService } from './check.service';
import {Product} from '../../../demo/domain/product';
import {ProductService} from '../../../demo/service/productservice';
import { Usuario } from './usuario';
import { Habitaciones } from '../../interfaces/habitaciones';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  public plantillaUsuario : PlantillaUsuario;
  
  public checkIn: CheckIn;

  products: Product[];

  constructor( private checkService: CheckService, private productService: ProductService) { }

  ngOnInit(): void {
    this.plantillaUsuario = {} as PlantillaUsuario;
    this.checkIn = {} as CheckIn;

    this.productService.getProductsSmall().then(data => this.products = data);

    this.checkIn.usuario = {} as Usuario;
    this.checkIn.usuario.habitaciones = [] as Habitaciones[];
    this.checkIn.usuario.habitaciones[0] = {} as Habitaciones;
  }

  cargarUsuario(): void{
    this.checkService.getCheckInByCedula(this.plantillaUsuario).subscribe(
      c =>{
        this.checkIn = c
      }
    )
  }

}