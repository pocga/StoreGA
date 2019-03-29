import { Component, OnInit, AfterViewInit,Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { EmbryoService } from '../../../Services/Embryo.service';
import { Router, NavigationEnd } from '@angular/router';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-Payment',
  templateUrl: './Payment.component.html',
  styleUrls: ['./Payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit{

   @Output() reserve: EventEmitter<any> = new EventEmitter();

   public datosBusqueda = [];
   public countRol: number;
   public totales = [];
   public datosUsuario= [];

   step = 0;
   isDisabledPaymentStepTwo  = true;
   isDisabledPaymentStepThree = false;
   emailPattern        : any = /\S+@\S+\.\S+/;
   offerCards : any = [
      {
         id: 1,
         name:"Debit Card",
         content: "Visa Mega Shopping Offer"
      },
      {
         id: 2,
         name:"Credit Card",
         content: "American Express 20% Flat"
      },
      {
         id: 3,
         name:"Debit Card",
         content: "BOA Buy 1 Get One Offer"
      },
      {
         id: 4,
         name:"Master Card",
         content: "Mastercard Elite Card"
      },
      {
         id: 5,
         name:"Debit Card",
         content: "Visa Mega Shopping Offer"
      }
   ]

   bankCardsImages : any = [
      {
         id:1,
         image:"assets/images/client-logo-1.png"
      },
      {
         id:2,
         image:"assets/images/client-logo-2.png"
      },
      {
         id:3,
         image:"assets/images/client-logo-3.png"
      },
      {
         id:4,
         image:"assets/images/client-logo-4.png"
      },
      {
         id:5,
         image:"assets/images/client-logo-5.png"
      }
   ]

  paymentFormOne   : FormGroup;
  public datos_usuario;


   constructor(public embryoService : EmbryoService, 
               private formGroup : FormBuilder,
               public router: Router) {

      this.embryoService.removeBuyProducts();
   }

   ngOnInit() {

      this.paymentFormOne = this.formGroup.group({
         user_details       : this.formGroup.group({
            first_name         : ['', [Validators.required]],
            last_name          : ['', [Validators.required]],
            street_name_number : ['', [Validators.required]],
            apt                : ['', [Validators.required]],
            zip_code           : ['', [Validators.required]],
            city_state         : ['', [Validators.required]],
            country            : ['', [Validators.required]],
            mobile             : ['', [Validators.required]],
            email              : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            share_email        : ['', [Validators.pattern(this.emailPattern)]],
         }),
         offers             : this.formGroup.group({
            discount_code   : [''],
            card_type       : [1],
            card_type_offer_name  : [null]
         }),
         payment            : this.formGroup.group({
            card_number     : ['', [Validators.required]],
            user_card_name  : ['', [Validators.required]],
            cvv             : ['', [Validators.required]],
            expiry_date     : ['', [Validators.required]],
            card_id         : [1],
            bank_card_value : [null]
         })
      });

      this.embryoService.getDataCart().subscribe((response) => {
         this.datosBusqueda = Object.keys(response).map(
             function(key) {
               return response[key]; });
                
         this.countRol = this.datosBusqueda.length;
         this.totales=this.datosBusqueda[2];
         //this.datosBusqueda=this.datosBusqueda[1];
         console.log(this.datosBusqueda); 
       });
   }

   ngAfterViewInit() {
   }

   public setStep(index: number) {
      this.step = index;
      switch (index) {
         case 0:
            this.isDisabledPaymentStepTwo = true;
            this.isDisabledPaymentStepThree = true;
            break;
         case 1:
            this.isDisabledPaymentStepThree = false;
            break;
         default:
            
            break;
      }
   }
/*
   public toggleRightSidenav() {
      this.embryoService.paymentSidenavOpen = !this.embryoService.paymentSidenavOpen;
   }*/

   public getCartProducts() {
      let total = 0;
      if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
         for(let product of this.embryoService.localStorageCartProducts) {
            if(!product.quantity){
               product.quantity = 1;
            }
            total += (product.price*product.quantity);
         }
         total += (this.embryoService.shipping+this.embryoService.tax);
         return total;
      } 
      return total; 
   }

   public submitPayment() {

      this.datos_usuario=this.paymentFormOne.value;
      
      //console.log(this.datos_usuario.user_details.first_name);
      //console.log(this.datos_usuario.user_details.city_state);
      //console.log(this.datos_usuario.user_details.mobile);
      //console.log(this.datos_usuario.user_details.street_name_number);
      //console.log(this.datos_usuario);

      var uuid4 = require('uuid4');
      var id = uuid4();
      console.log("id aleatorio"+id)
      this.datosUsuario= [{  "ciudadDestinatario":this.datos_usuario.user_details.city_state,
      "direccionDestinatario": this.datos_usuario.user_details.street_name_number,
      "fecha": "yyyy-MM-dd'T'HH:mm:ss",
      "idPedido": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "idUsuario": "eliana",
      "nombreDestinatario": this.datos_usuario.user_details.first_name,
      "productos": [
         {
            "cantidad": 0,
            "idProducto": 0
         }
      ],
      "telefonoDestinatario": this.datos_usuario.user_details.mobile
      }];

      

      console.log(this.datosUsuario);
      
      let resultado;
      this.embryoService.confirmarPedido(this.datosBusqueda).subscribe((res: HttpResponse<any>) => {
         resultado = res.statusText;
         this.embryoService.PopupThank();
         },
         (error) => {
           console.log("error: " + JSON.stringify(error));
         }
           );

      
     
      /*
      let userDetailsGroup = <FormGroup>(this.paymentFormOne.controls['user_details']);
      if(userDetailsGroup.valid)
      {
         switch (this.step) {
            case 0:
               this.step = 1;
               this.isDisabledPaymentStepTwo = false;
               break;
            case 1:
               this.step = 2;
               break;
            
            default:
               // code...
               break;
         }
      } else {
         this.isDisabledPaymentStepTwo = true;
         this.isDisabledPaymentStepThree = true;
         for (let i in userDetailsGroup.controls) {
            userDetailsGroup.controls[i].markAsTouched();
         }
      }*/

   }
   returnCart(){
      this.router.navigate(['/cart/']);
   }

   public selectedPaymentTabChange(value) {
      let paymentGroup = <FormGroup>(this.paymentFormOne.controls['payment']); 

      paymentGroup.markAsUntouched();

      if(value && value.index == 1) {
            paymentGroup.controls['card_number'].clearValidators();
            paymentGroup.controls['user_card_name'].clearValidators();
            paymentGroup.controls['cvv'].clearValidators();
            paymentGroup.controls['expiry_date'].clearValidators();

            paymentGroup.controls['bank_card_value'].setValidators([Validators.required]); 
      } else {
        
         paymentGroup.controls['card_number'].setValidators([Validators.required]); 
         paymentGroup.controls['user_card_name'].setValidators([Validators.required]); 
         paymentGroup.controls['cvv'].setValidators([Validators.required]); 
         paymentGroup.controls['expiry_date'].setValidators([Validators.required]); 

         paymentGroup.controls['bank_card_value'].clearValidators();
      }

      paymentGroup.controls['card_number'].updateValueAndValidity();
      paymentGroup.controls['user_card_name'].updateValueAndValidity();
      paymentGroup.controls['cvv'].updateValueAndValidity();
      paymentGroup.controls['expiry_date'].updateValueAndValidity();
      paymentGroup.controls['bank_card_value'].updateValueAndValidity();
   }

   public finalStep() {
      let paymentGroup = <FormGroup>(this.paymentFormOne.controls['payment']);
      if(paymentGroup.valid) {
         this.embryoService.addBuyUserDetails(this.paymentFormOne.value);
         this.router.navigate(['/checkout/final-receipt']);
      } else {
         for (let i in paymentGroup.controls) {
            paymentGroup.controls[i].markAsTouched();
         }
      }
   }
}



