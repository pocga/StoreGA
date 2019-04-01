import { Component, OnInit} from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import {HttpResponse} from '@angular/common/http';
import { Options, LabelType } from 'ng5-slider';
import * as $ from 'jquery';
@Component({
  selector: 'app-PanelProducts',
  templateUrl: './PanelProducts.component.html',
  styleUrls: ['./PanelProducts.component.scss']
})
export class PanelProductsComponent implements OnInit {
    public index = 0;
    public products_list:boolean=false;
    public productList;
    public datosBusqueda = [];
    
    public  categorias: any;
    public precios:any;
    public maxPrice;
    public minPrice;
    valueRangePrice;
    values = [];

    minValue: number;
    maxValue: number;
    options: Options;

    public optionYes:boolean = false
    public optionNo:boolean = false
  
   constructor(private embryoService:EmbryoService,private toastyService: ToastaService ) {
    }
   
  ngOnInit() {   
     this.getCategories();
     this.getPrice();
  }

  public getPrice(){

    this.embryoService.getPrice().subscribe((response) => {
      this.precios = Object.keys(response).map(key => response[key]);  
      this.minValue= this.precios[0];
      this.maxValue= this.precios[1];
    
    this.options = {
        floor: this.minValue,
        ceil: this.maxValue,
        translate: (valueRangePrice: number, label: LabelType): string => {
           
          switch (label) {
            case LabelType.Low:
            
            this.minPrice=valueRangePrice;
              return '<b class="values-precio"></b> $' +valueRangePrice;
              //return '<b class="values-precio"> min:</b> $' + value;
            case LabelType.High:
           
            this.maxPrice=valueRangePrice;
              return '<b class="values-precio"> </b> $' + valueRangePrice;
                //return '<b class="values-precio"> max:</b> $' + value;
            default:
              return '$' + valueRangePrice;
            }
            
          }
          
      };//
          
    
    }); 
    } 
  
  
  public getCategories() {
    this.embryoService.getCategories().subscribe((response) => {
      this.categorias = Object.keys(response).map(key => response[key]);   
      this.categorias = this.categorias[0];
    }); 
  }
  selectCategorias(value){
    
    if (value=="Televisores"){
      value="TV"
    } else if (value=="Portatiles"){
      value="Portátiles"
    }

    this.embryoService.getOnlyCategoria(value).subscribe((response) => {
    let Onlycategorias = Object.keys(response).map(key => response[key]);   
      this.datosBusqueda=Onlycategorias[0];
      this.products_list = true;
    }); 
    

  }
  public addToCart(value:any) {
 
    let toastOption: ToastOptions = {
      title: "Añadiendo producto al carrito",
      msg: "Producto añadido",
      showClose: true,
      timeout: 5000,
      theme: "material"
   };
   let resultado: string;
   
    this.embryoService.addToCart(value).subscribe((res: HttpResponse<any>) => {
      resultado = res.statusText;
      this.toastyService.wait(toastOption);
     //this.embryoService.updateLocalCartProduct(value);
     // this.embryoService.calculateLocalCartProdCounts();
      },
      (error) => {
        console.log("error: " + JSON.stringify(error));
        let toastOption: ToastOptions = {
          title: "ERROR",
          msg: error.error.descripcionRespuesta,
          showClose: true,
          timeout: 10000,
          theme: "material"
       };
       this.toastyService.wait(toastOption);
      }
        );
    
   
  }
  checkAllProducts(){

        this.index++;
        if (this.index >=1){
        this.products_list = true;
        }
        this.embryoService.getAllCatalogo().subscribe((response) => {
          let datosBusquedas = Object.keys(response).map(
              function(key) {
                return response[key]; });
          this.datosBusqueda=datosBusquedas[0];          
        });                

  }
  applyFilter(valuePriceLow: any, valuePriceHigh: any){
      
      const valuesFilter = {
        "categorias": this.values.join(),
        "disponibilidad": (this.optionYes === this.optionNo) ? '' : (this.optionYes === true) ? true : false,
        "from": valuePriceLow,
        "to": valuePriceHigh
      }
      
      this.embryoService.getCatalogByFilter(valuesFilter).subscribe(response => {
        //let catalogFound = Object.keys(response).map( key => response[key]);
        //this.datosBusqueda = catalogFound[0]
        console.log(response);             
      });                
    }
    cathEventDisponibilityYes(isChecked:boolean){
        this.optionYes=isChecked; 
  }

  cathEventDisponibilityNo(isChecked:boolean){
      this.optionNo=isChecked;
  }

  cathEvent(item:any, isChecked:boolean){

      if (isChecked){
        this.values.push((item === 'Televisores') ? 'TV' : item);
      }else {
        let index=this.values.indexOf(item);
        this.values.splice(index,1);
      }
  }
    
    

  reviewPopup(detailData){ 
      this.embryoService.reviewPopup(detailData);
  }


}