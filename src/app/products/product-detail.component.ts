import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {ProductService} from './product.service'

import {IProduct} from './product'
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product$: Observable<IProduct>;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {
    console.log(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
      let id = +this.route.snapshot.paramMap.get('id');
      this.product$ = this.productService.getProduct(id);
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
