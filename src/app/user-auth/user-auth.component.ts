import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, logIn, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  showLogin = false;
  loginError: string = '';
  signInError: string = '';
  constructor(private user: UserService, private product:ProductService) { }
  ngOnInit(): void {
    this.user.userAuthReload();

    this.user.isLogInError.subscribe((isError) => {
      if (isError) {
        this.loginError = "Login Failed! Email or Password is not correct.";
      } else {
        this.localCarttoRemoteCart(); // ✅ Now it's guaranteed to be called after login success
      }
    });

  }
  signUp(data: signUp) {
    this.signInError = ""
    this.user.userSignUp(data);
    this.user.isSignUpError.subscribe((isError) => {
      this.signInError = "Email already registered! please use different email."
    })
  }
  logIn(data: logIn) {
    this.loginError = "";
  this.user.userLogIn(data);
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignIn() {
    this.showLogin = false;
  }

  localCarttoRemoteCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data && userId) {
      let cartDataList: product[] = JSON.parse(data)
      cartDataList.forEach((product: product,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("item stored in db")
            }
          })
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart')
          }
          
        }, 500*index);
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);
  }

}
