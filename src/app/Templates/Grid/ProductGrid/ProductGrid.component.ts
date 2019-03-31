/*import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {EmbryoService } from '../../../Services/Embryo.service';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'embryo-ProductGrid',
  templateUrl: './ProductGrid.component.html',
  styleUrls: ['./ProductGrid.component.scss']
})
export class ProductGridComponent implements OnInit {

   @Input() detailData : any;

   @Input() products : any ;

   @Input() currency : string;

   @Input() gridLength : any;

   @Input() gridThree : boolean = false;

   @Output() addToCart: EventEmitter<any> = new EventEmitter();

   @Output() addToWishList: EventEmitter<any> = new EventEmitter();
   
   productReviews : any;
   loaded = false;
   lg     = 25;
   xl     = 25;

   trackByObjectID(index, hit) {
      return hit.objectID;
   }

   constructor(public embryoService : EmbryoService,private toastyService: ToastaService) {
      this.embryoService.getProductReviews().valueChanges().subscribe(res => {this.productReviews = res});
   }

   ngOnInit() {

      if(this.gridThree) {
         this.lg = 33;
         this.xl = 33;
      }
   }
   public reviewPopup(detailData) {

      this.embryoService.reviewPopup(detailData);
      
   }

   public addToCartProduct(value:any) {
     
      this.addToCart.emit(value);
      
      let toastOption: ToastOptions = {
         title: "Añadiendo producto al carrito",
         msg: "Producto añadido",
         showClose: true,
         timeout: 3000,
         theme: "material"
      };
      let resultado: string;
      this.embryoService.addToCart(value).subscribe((res: HttpResponse<any>) => {
         resultado = res.statusText;
         this.toastyService.wait(toastOption);
         },
         (error) => {
           console.log("error: " + error.statusText);
         }
       ); 
       this.embryoService.calculateLocalCartProdCounts();
   }

   public onLoad() {
      this.loaded = true;
   }
   /*
   public productAddToWishlist(value:any, parentClass) {
      if(!(document.getElementById(parentClass).classList.contains('wishlist-active'))){
         let element = document.getElementById(parentClass).className += " wishlist-active";
      }
      this.addToWishList.emit(value);
   }

   public checkCartAlready(singleProduct) {
      let products = JSON.parse(localStorage.getItem("cart_item")) || [];
      if (!products.some((item) => item.name == singleProduct.name)) {
         return true;
      }
   }

}*/