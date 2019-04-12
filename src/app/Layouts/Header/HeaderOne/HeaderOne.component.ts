import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmbryoService } from '../../../Services/Embryo.service';
import {Router} from '@angular/router'
import { AuthService } from 'src/app/Services/auth.service';
import { CountService } from 'src/app/Services/count.service';

@Component({
  selector: 'HeaderOne',
  templateUrl: './HeaderOne.component.html',
  styleUrls: ['./HeaderOne.component.scss']
})

export class HeaderOneComponent implements OnInit {

   toggleActive     : boolean = false;
   cartProducts     : any;
   popupResponse    : any;
   wishlistProducts : any;
   public datosBusqueda = [];
   public contProducts: any;

   constructor(public embryoService: EmbryoService, public router:Router,private _autService1:AuthService,private data: CountService) {}

   ngOnInit() {                       
      this.embryoService.getDataCart().subscribe((response) => {
         this.datosBusqueda = Object.keys(response).map(key => response[key]);   
         this.contProducts = this.datosBusqueda[1].length;
         
      }, err =>  this.contProducts = 0);
      this.data.currentIndex.subscribe(contador => { this.contProducts =contador; });
   }

   contProductsCart($event){
      this.contProducts=$event;
   }
   
   followProduct(){
      this.router.navigate(['/home/order-history']);
   }

   public signout(){
      let messagee = "¿Esta seguro que desea cerrar sesión?";
      this.embryoService.confirmationPopupSignout(messagee).
         subscribe(res => {this.popupResponse = res
         },                
                   err => console.log(err),
                   ()  => this.getPopupResponse(this.popupResponse)
                   
                  );  
   }

   public getPopupResponse(response) {
      if(response){
       //  this.router.navigate(['/signout']);
         this._autService1.singOut()
      }
   }

   public toggleSearch() {
      document.querySelector('app-main').classList.toggle('form-open');
   }

   public toggleSidebar()
   {
      this.embryoService.sidenavOpen = !this.embryoService.sidenavOpen;
   }

   public openConfirmationPopup(value:any) {
      let message = "Are you sure you want to delete this product?";
      this.embryoService.confirmationPopup(message).
         subscribe(res => {this.popupResponse = res},
                   err => console.log(err),
                   ()  => this.getPopupResponsee(this.popupResponse, value, 'cart')
                  );
   }

   public getPopupResponsee(response:any, value:any, type) {
      if(response) {
         if(type == 'cart'){
            this.embryoService.removeLocalCartProduct(value);
         } else {
            this.embryoService.removeLocalWishlistProduct(value);
         }
      }
   }

   public addAllWishlistToCart(values:any) {
      this.embryoService.addAllWishListToCart(values);
   } 

   public openWishlistConfirmationPopup(value:any) {
      let message = "Are you sure you want to add all products?";
      this.embryoService.confirmationPopup(message).
         subscribe(res => {this.popupResponse = res},
                   err => console.log(err),
                   ()  => this.getPopupResponsee(this.popupResponse, value, 'wishlist')
                  );
   }

   public selectedCurrency(value) {
      this.embryoService.currency = value;
   }

   public selectedLanguage(value) {
      this.embryoService.language = value;
   }

   public addToCart(value) {
      this.embryoService.addToCart(value, 'wishlist');
   }
}
