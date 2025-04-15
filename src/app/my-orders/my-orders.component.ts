import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{
  orderData:order[]|undefined
  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
    
   
  }
 

}
