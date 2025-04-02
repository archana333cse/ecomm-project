import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { logIn, signUp } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  constructor (private seller:SellerService, private router :Router){}
  showLogin=false;
  authError1:string='';
  authError2:string='';
  ngOnInit(){
    this.seller.reloadSeller();
  }
  signUp(data:signUp):void{
    this.authError1=""
   this.seller.userSignUp(data)
   this.seller.isSignUpError.subscribe((isError)=>{
      if(isError){
        this.authError1="Email already registered. Please use a different email."
      }
   })
  }
  logIn(data:logIn):void{
    this.authError2=""
    this.seller.userLogIn(data)
    this.seller.isLogInError.subscribe((isError)=>{
      if(isError){
        this.authError2="Email or Password is not correct"

      }
    })
  }
  openLogin(){
   this.showLogin=true;

  }
  goToSignUp(){
    this.showLogin=false;
  }
  
}
