import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {
  productData:undefined|product
  updateMessage:undefined|string;
  constructor(private route:ActivatedRoute, private product:ProductService){}
  ngOnInit(): void {
   this.route.paramMap.subscribe(param=>{
    let productId=param.get('id')
    console.warn(productId)
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn(data)
      this.productData=data;
    })
   })
  }
   
  editProduct(data:product){
   console.warn(data)
   if(this.productData){
    data.id=this.productData.id;
   }
   this.product.updateProduct(data).subscribe((result)=>{
   if(result){
    this.updateMessage="Product updated successfully!!"
   }
   setTimeout(() => {
    this.updateMessage=undefined;
   }, 3000);
   })
  }
}
