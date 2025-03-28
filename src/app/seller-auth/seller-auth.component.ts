import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  constructor (private seller:SellerService){}
  signUp(data:object):void{
   
   this.seller.userSignUp(data).subscribe((result)=>{
    console.warn(result);
    alert("Registration Successfull!!")
   })
  }
}
