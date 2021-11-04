import { Component, OnInit } from '@angular/core';
import {Product} from '../../../demo/domain/product';
import {ProductService} from '../../../demo/service/productservice';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsSmall().then(data => this.products = data);
  }

}