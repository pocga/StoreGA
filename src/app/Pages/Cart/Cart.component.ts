import { Component, OnInit, AfterViewChecked} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ChangeDetectorRef } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import { EmbryoService } from '../../Services/Embryo.service';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';

@Component({
  selector: 'embryo-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewChecked {

   products       : any;
   quantityArray  : number[] = [1,2,3,4,5,6,7,8,9,10];
   popupResponse  : any;
   public datosBusqueda = [];
   public countRol: number;
   public totales = [];
   
   constructor(public embryoService : EmbryoService, 
               private router: Router,
               private loadingBar: LoadingBarService,
               private cdRef : ChangeDetectorRef,private toastyService: ToastaService) {
   }

   ngOnInit() {

      this.embryoService.getDataCart().subscribe((response) => {
        this.datosBusqueda = Object.keys(response).map(
            function(key) {
              return response[key]; });
               
        this.countRol = this.datosBusqueda.length;
        this.totales=this.datosBusqueda[2];
        this.datosBusqueda=this.datosBusqueda[1];
        console.log(this.datosBusqueda); 
      });      
   }

   ngAfterViewChecked() : void {
      this.cdRef.detectChanges();
   }

   public removeProduct(value:any) {
    
      let message = "¿Esta seguro que desea eliminar el producto?";
      this.embryoService.confirmationPopup(message).
         subscribe(res => {this.popupResponse = res
         },                
                   err => console.log(err),
                   ()  => this.getPopupResponse(this.popupResponse, value)
                   
                  );
       
   }

   public getPopupResponse(response, value) {
      
      if(response){
         let resultado;
         this.embryoService.deleteCart(value).subscribe((res: HttpResponse<any>) => {
            resultado = res.statusText;
            },
            (error) => {
            console.log(error)
            
            }
              );        
      }
   }



   public calculateTotalPrice() {
      let subtotal = 0;
      if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
         for(let product of this.embryoService.localStorageCartProducts) {
            subtotal += (product.precio *product.cantidad);
         }
         return subtotal;
      }
      return subtotal;
      
   }

   public getTotalPrice() {
      let total = 0;
      if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
         for(let product of this.embryoService.localStorageCartProducts) {
            total += (product.precio*product.cantidad);
         }
         total += (this.embryoService.shipping+this.embryoService.tax);
         return total;
      }

      return total; 
   }

   public updateLocalCartProduct() {
      this.embryoService.updateAllLocalCartProduct(this.embryoService.localStorageCartProducts);
      this.router.navigate(['/checkout/payment']);
   }

   public getQuantityValue(item) {
      if(item.cantidad>1) {
         return item.cantidad
      } else {
         return 1;
      }
   }

   changeQuantity(item, value:any){
   
      let resultado;
      this.embryoService.putDataCart(item,value).subscribe((res: HttpResponse<any>) => {
         resultado = res.statusText;

         let toastOption: ToastOptions = {
            title: "MODIFICANDO",
            msg: "El producto se modifico correctamente",
            showClose: true,
            timeout: 3000,
            theme: "material"
         };
         this.toastyService.wait(toastOption);
         console.log("si");
         },
         (error) => {
           let toastOption: ToastOptions = {
            title: "ERROR",
            msg: "El producto supera el limite disponible",
            showClose: true,
            timeout: 3000,
            theme: "material"
         };
         this.toastyService.wait(toastOption);
         console.log("no");
         }
           );
           
   }

   public calculateProductSinglePrice(product:any, value: any) {
      
      let precio :number;
      precio = product.precio*value;
      return precio;
   }
}
