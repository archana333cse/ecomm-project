import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  totalPrice:number|undefined
  cartData:cart[]|undefined
  orderMsg:string|undefined
  constructor(private product:ProductService, private router:Router){}
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      this.cartData=result;
      let price=0;
      result.forEach((item)=>{
        if(item.quantity){
          price=price + (+item.price* + item.quantity);
        }
      })

        this.totalPrice=price+(price/10)+100-(price/10)
      
    })
   
  }

  orderNow(data:{email:string,address:string,contact:string}){
   let user=localStorage.getItem('user');
   let userId=user && JSON.parse(user).id;
   if(this.totalPrice){
    let orderData:order={
      ...data,
      totalPrice: this.totalPrice,
      userId,
      id: undefined
    }
    this.cartData?.forEach((item)=>{
     setTimeout(() => {
      item.id && this.product.deleteCartItems(item.id)
      
     }, 500);

    })
    this.product.orderNow(orderData).subscribe((result)=>{
      if(result){
       this.orderMsg="Your order has been placed!!"
       setTimeout(() => {
        this.router.navigate(['/my-orders'])
        this.orderMsg=undefined
       }, 5000);
      }
    })
   }
  

  }

}
