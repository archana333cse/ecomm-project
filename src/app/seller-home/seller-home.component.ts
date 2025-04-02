import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  imports: [CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[]

  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.product.productList().subscribe((result) => {
      console.warn(result)
      this.productList=result;
    })
  }
}
