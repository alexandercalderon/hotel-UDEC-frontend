import { Component, OnInit } from '@angular/core';
import {Product} from '../../../demo/domain/product';
import {ProductService} from '../../../demo/service/productservice';

@Component({
  selector: 'app-check-in2',
  templateUrl: './check-in2.component.html',
  styleUrls: ['./check-in2.component.scss']
})
export class CheckIn2Component implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsSmall().then(data => this.products = data);
  }

}