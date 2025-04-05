import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { json } from 'stream/consumers';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[]
  constructor(private route: Router, private product: ProductService) {

  }
  ngOnInit(): void {

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          //console.warn('In Seller Area')
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name
          this.menuType = 'seller';
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        }
        else {
          //console.warn("Outside seller area")
          this.menuType = 'default'
        }
      }

    })
  }
  logOut() {
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }
  userlogOut() {
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
  }
  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        //console.warn(result)
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`])
  }
  rediretToDetails(id: number) {
    this.route.navigate([`/details/` + id])
  }
}