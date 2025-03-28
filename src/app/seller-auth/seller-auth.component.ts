import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  constructor (private seller:SellerService, private router :Router){}
  signUp(data:signUp):void{
   
   this.seller.userSignUp(data).subscribe((result)=>{
    if(result){
      alert("Registration Successfull!!")
     this.router.navigate(['seller-home'])
    }
    /* console.warn(result);
    */
   })
  }
}
