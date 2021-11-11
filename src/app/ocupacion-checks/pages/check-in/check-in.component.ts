import { Component, OnInit } from '@angular/core';
import { PlantillaUsuario } from './plantilla-usuario';
import { CheckIn } from './check-in';
import { CheckService } from './check.service';
import {Product} from '../../../demo/domain/product';
import {ProductService} from '../../../demo/service/productservice';
import { Usuario } from './usuario';
import { Habitacion } from './habitacion';
import { MessageService } from "primeng/api";
import {ToastModule} from 'primeng/toast';
import { Router, ActivatedRoute } from '@angular/router';
import swal from'sweetalert2';


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  public plantillaUsuario : PlantillaUsuario;
  public checkIn: CheckIn;
  public habitacion: Habitacion[];
  products: Product[];

  constructor( private checkService: CheckService, private productService: ProductService
            , private mess: MessageService
            , private routerActive: ActivatedRoute
            , private router: Router) { }

  ngOnInit(): void {
    this.plantillaUsuario = {} as PlantillaUsuario;
    this.checkIn = {} as CheckIn;
    this.checkIn.usuario = {} as Usuario;
    this.checkIn.usuario.habitaciones = [] as Habitacion[];
    this.habitacion = [] as Habitacion[];

    this.cargarCheckIn();
  }

  cargarUsuario(): void{
    this.checkService.getCheckInByCedula(this.plantillaUsuario).subscribe(
      c =>{
        this.checkIn = c
        this.habitacion = c.usuario.habitaciones;
      },
      err => {
        this.mess.add({
          severity: "error",
          summary: "Información no encontrada",
          detail: err.error.mensaje,
        });
        this.plantillaUsuario = {} as PlantillaUsuario;
        this.checkIn = {} as CheckIn;
        this.checkIn.usuario = {} as Usuario;
        this.checkIn.usuario.habitaciones = [] as Habitacion[];
        this.habitacion = [] as Habitacion[];
      }
    )
  }


  cargarCheckIn(): void{
    this.routerActive.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.checkService.getCheckInById(id).subscribe(
            check => {
              this.checkIn = check;
              this.habitacion = check.usuario.habitaciones;
            },
            err =>{
              this.router.navigate(['/check-in'])
              swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.error.mensaje,
                showConfirmButton: false,
                timer: 2500
              })              
            }
          )
        }
      }
    );
  }

}