import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  productDetails:undefined|product
  productQuantity:number=1;
  removeCart=false;
  constructor(private activeRoute:ActivatedRoute, private product:ProductService){}
  ngOnInit(): void {
  
   let productId=this.activeRoute.snapshot.paramMap.get('productId')
   //console.warn(productId);
   productId && this.product.getProduct(productId).subscribe((result)=>{
  this.productDetails=result
   console.warn(this.productDetails)
   })

   let cartData=localStorage.getItem('localCart');
   if(productId && cartData){
    let items=JSON.parse(cartData)
    items=items.filter((item:product)=>productId==item.id.toString())
    if(items.length){
      this.removeCart=true;
    }else{
      this.removeCart=false;
    }
   }
  }
  
  handleQuantity(val:string){
   if(this.productQuantity<20 && val==='plus')
   {
    this.productQuantity+=1;
   } else if(this.productQuantity>1 && val==='min'){
    this.productQuantity-=1;
   }
  }
  addToCart(){
    if(this.productDetails){
      this.productDetails.quantity=this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productDetails)
        this.removeCart=true;
      } else{
        let user=localStorage.getItem('user')
        let userId= user && JSON.parse(user).id
        let cartData:cart={
          ...this.productDetails,
          userId,
          productId: this.productDetails.id
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            alert("product is added in cart")
          }

        })
      }
    }
  }
  removeToCart(productId:number){
    this.product.removeItemFromCart(productId)
    this.removeCart=false;
  }

}
