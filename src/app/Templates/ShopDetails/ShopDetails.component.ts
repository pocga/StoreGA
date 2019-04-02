import { Component, OnInit, Input, OnChanges,Output, EventEmitter, Renderer2, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import {HttpResponse} from '@angular/common/http';

import {EmbryoService } from '../../Services/Embryo.service';

@Component({
  selector: 'embryo-ShopDetails',
  templateUrl: './ShopDetails.component.html',
  styleUrls: ['./ShopDetails.component.scss']
})
export class ShopDetailsComponent implements OnInit, OnChanges {


   @Input() detailData : any;
   @Input() currency   : string; 

   mainImgPath   : string;
   totalPrice    : any;
   type          : any;
   colorsArray   : string[] = ["Red", "Blue", "Yellow", "Green"];
   sizeArray     : number[] = [36,38,40,42,44,46,48];
   quantityArray : number[] = [1,2,3,4,5,6,7,8,9,10];
   productReviews : any;

  public cantidad="1";

   constructor(private route: ActivatedRoute,
               private router: Router, 
               public embryoService : EmbryoService,private toastyService: ToastaService
               ) {
      this.embryoService.getProductReviews().valueChanges().subscribe(res => {this.productReviews = res});
   }

   ngOnInit() {
      console.log(this.detailData) 
      this.mainImgPath = this.detailData.imagen;
      this.totalPrice  = this.detailData.precio; 

      this.route.params.subscribe(res => {
         this.type = null;
         this.type = res.type; 
      });
   }

   ngOnChanges() {
      this.mainImgPath = null;
      this.totalPrice  = null;
      this.mainImgPath = this.detailData.imagen;
      this.totalPrice  = this.detailData.precio; 
   }

   /**
    * getImagePath is used to change the image path on click event. 
    */
   public getImagePath(imgPath: string, index:number) {
      document.querySelector('.border-active').classList.remove('border-active');
      this.mainImgPath = imgPath;
      document.getElementById(index+'_img').className += " border-active";
   }

   public calculatePrice(detailData:any, value: any) {
      detailData.quantity = value;
      this.cantidad=value;
      this.totalPrice = detailData.price*value;
   }


   public addToWishlist(value:any) {
      this.embryoService.addToWishlist(value);
   }

   public addToCart(value:any) {
      
      let toastOption: ToastOptions = {
         title: "Añadiendo producto al carrito",
         msg: "Producto añadido",
         showClose: true,
         timeout: 3000,
         theme: "material"
      };
      let resultado: string;
      console.log(value)
      this.embryoService.addToCart(value,this.cantidad).subscribe((res: HttpResponse<any>) => {
         resultado = res.statusText;
         this.toastyService.wait(toastOption);
         },
         (error) => {
           console.log("error: " + error.statusText);
         }
       ); 
       this.embryoService.calculateLocalCartProdCounts();
   }
   public buyNow(value:any) {
      this.embryoService.buyNow(value);
      this.router.navigate(['/checkout']);
   }

}
