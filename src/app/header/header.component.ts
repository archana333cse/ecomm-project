import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { json } from 'stream/consumers';


@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  menuType:string='default';
  sellerName:string='';
 constructor ( private route: Router){

 }
 ngOnInit(): void {
 
   this.route.events.subscribe((val:any)=>{
    if(val.url){
      if(localStorage.getItem('seller') && val.url.includes('seller')){
      console.warn('In Seller Area')
      this.menuType='seller'
      if(localStorage.getItem('seller')){
        let sellerStore=localStorage.getItem('seller');
        let sellerData= sellerStore && JSON.parse(sellerStore)[0]
        this.sellerName=sellerData.name

      }
      }else{
        console.warn("Outside seller area")
        this.menuType='default'
      }

    }
   })
 }
 logOut(){
  localStorage.removeItem('seller')
  this.route.navigate(['/'])
 }
}
