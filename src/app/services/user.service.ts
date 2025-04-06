import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { logIn, signUp } from '../data-type';
import { Router } from '@angular/router';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private route:Router) { }
  isUserLoggedIn = new BehaviorSubject<Boolean>(false)
  userSignUp(data:signUp){
   console.warn("user service called")
   this.http.post(`http://localhost:3000/user`,data,{ observe: 'response' }).subscribe((result)=>{
      this.isUserLoggedIn.next(true);
      localStorage.setItem('user', JSON.stringify(result.body));
      this.route.navigate([''])
      console.warn(result)
   })
  }
  userLogIn(data:logIn){
    this.http.get(`http://localhost:3000/user?email=${data.email}& password=${data.password}`,{observe: 'response'}).subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        console.warn("User Logged In!!")
        localStorage.setItem('user', JSON.stringify(result.body))
        this.route.navigate(['/'])
      }

    })
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/'])
    }
  }
}
