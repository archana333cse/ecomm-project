import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { product } from '../data-type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, Router, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [CommonModule,FontAwesomeModule,RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[]
  deleteProductMessage: undefined | string;
  icon=faTrash;
  updateIcon=faPenToSquare;

  constructor(private product: ProductService) { }
  ngOnInit(): void {
   this.pList();
  }

  deleteProduct(id:number){
    console.warn(id)
   this.product.deleteProduct(id).subscribe((result)=>{
    if(result){
    this.deleteProductMessage="Product deleted successfully!!"
    this.pList();
    }
    setTimeout(() => {
      this.deleteProductMessage=undefined;
    }, 3000);
   })
  }
  pList(){
    this.product.productList().subscribe((result) => {
      console.warn(result)
      if(result){
        this.productList=result;
      }
    })
  }
}
