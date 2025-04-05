import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  searchResult:undefined|product[]
  productNotFound:string='';
  constructor(private activeRoute:ActivatedRoute, private product:ProductService){}
  ngOnInit():void{
    let query=this.activeRoute.snapshot.paramMap.get('query')
    console.warn(query)
    query && this.product.searchProduct(query).subscribe((result)=>{
      if(result && result.length > 0){
        this.searchResult=result;
        this.productNotFound = "";
      }
      else{
        this.searchResult = undefined;
        this.productNotFound="Product not availabel"
      }
    })
  }

}
