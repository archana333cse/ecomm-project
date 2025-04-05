import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | product[]
  trendyProducts: undefined | product[]
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.popularProduct().subscribe((data) => {
    this.popularProducts=data;
    })
    this.product.trendyProducts().subscribe((products)=>{
      this.trendyProducts=products;
    })
  }


}
