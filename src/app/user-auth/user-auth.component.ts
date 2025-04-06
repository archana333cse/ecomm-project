import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { logIn, signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit{
  showLogin=false;
  constructor(private user:UserService){}
  ngOnInit(): void {
    this.user.userAuthReload();
   
  }
  signUp(data:signUp){
    this.user.userSignUp(data);
  }
  logIn(data:logIn){
    this.user.userLogIn(data);
  }
  openLogin(){
    this.showLogin=true;
  }
  openSignIn(){
    this.showLogin=false;
  }

}
