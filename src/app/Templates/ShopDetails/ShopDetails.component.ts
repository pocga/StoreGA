import { Component, OnInit, Input, OnChanges,Output, EventEmitter, Renderer2, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import {HttpResponse} from '@angular/common/http';

import {EmbryoService } from '../../Services/Embryo.service';
import { CountService } from 'src/app/Services/count.service';

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
   public countRol :any ;

  public cantidad="1";

   constructor(private route: ActivatedRoute,
               private router: Router, 
               public embryoService : EmbryoService,private toastyService: ToastaService,private toastyConfig: ToastaConfig,private data: CountService
               ) {
      this.embryoService.getProductReviews().valueChanges().subscribe(res => {this.productReviews = res});
      this.toastyConfig.position = "top-right";
      
   }

   ngOnInit() {
       
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
         title: "Producto añadido",
         msg: "",
         showClose: true,
         timeout: 1000,
         theme: "material"  
         
      };
     
      let resultado: string;
      
      this.embryoService.addToCart(value,this.cantidad).subscribe((res: HttpResponse<any>) => {
         resultado = res.statusText;
         this.toastyService.wait(toastOption);
         this.embryoService.getDataCart().subscribe((response) => {
            let respuesta = Object.keys(response).map(key => response[key]);   
            this.countRol = respuesta[1].length; 
            this.data.changeIndex(this.countRol);
            //this.contProducts.emit(this.countRol);
         }); 


         },
         (error) => {
           let toastOption: ToastOptions = {
            title: "ADVERTENCIA",
            msg: error.error.descripcionRespuesta,
            showClose: true,
            timeout: 1000,
            theme: "material"
          };
          this.toastyService.wait(toastOption);
         }
       ); 
       this.embryoService.calculateLocalCartProdCounts();
   }
   
   public buyNow(value:any) {
      this.embryoService.buyNow(value);
      this.router.navigate(['/checkout']);
   }

}
