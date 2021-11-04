import { Component, OnInit } from '@angular/core';
import { PlantillaUsuario } from './plantilla-usuario';
import { CheckIn } from './check-in';
import { CheckService } from './check.service';
import {Product} from '../../../demo/domain/product';
import {ProductService} from '../../../demo/service/productservice';

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
  }

  cargarUsuario(): void{
    this.checkService.getCheckInByCedula(this.plantillaUsuario).subscribe(
      c =>{
        this.checkIn = c
      }
    )
  }

}
/*        <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col">
                <label for="habitaciones">Numero de habitaciones:</label>
                <input name="habitaciones" [(ngModel)]="checkIn.usuario.habitaciones[0].numeroHabitacion" type="text"> 
            </div>
            <div class="p-field p-col">
                <label for="tarifa">Tarifa total:</label>
                <input name="tarifa" [(ngModel)]="checkIn.usuario.habitaciones[0].tarifa" type="text"> 
            </div>
        </div> */