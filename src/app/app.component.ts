import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerService } from './services/seller.service';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { FooterComponent } from "./footer/footer.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, RouterLink, RouterLinkActive, FormsModule, HomeComponent, SellerAuthComponent, CommonModule, FontAwesomeModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecom.project';
  
}
