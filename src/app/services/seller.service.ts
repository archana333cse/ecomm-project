import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { logIn, signUp } from '../data-type';
import { response } from 'express';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<Boolean>(false)
  isLogInError= new EventEmitter<Boolean>(false)
  isSignUpError=new EventEmitter<Boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    //check if eamil is already exist
    this.http.get<signUp[]>(`http://localhost:3000/seller?email=${data.email}`).subscribe((users)=>{
      if(users.length>0){
        this.isSignUpError.emit(true)
        //alert("Email already registered. Please use a different email.");
      }
      else{
        this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        })
      }
    })

  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
  userLogIn(data:logIn){
   //api call will be there
   this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe: 'response'}).subscribe((result:any)=>{
    if(result && result.body && result.body.length){
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }
    else{
      this.isLogInError.emit(true);
    }
   })
  }
}
