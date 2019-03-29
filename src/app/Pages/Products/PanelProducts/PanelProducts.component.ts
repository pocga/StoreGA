import { Component, OnInit} from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import {HttpResponse} from '@angular/common/http';

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
    public  categorias=['Tvs','PCs','Celulares'];

  
   constructor(private embryoService:EmbryoService,private toastyService: ToastaService ) {
   
    }
   
  ngOnInit() {   
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
  checkProducts(){

        this.index++;
        if (this.index >=1){
        this.products_list = true;
        }
        this.embryoService.getAllCatalogo().subscribe((response) => {
          this.datosBusqueda = Object.keys(response).map(
              function(key) {
                return response[key]; });
          this.datosBusqueda=this.datosBusqueda[0]
        });                

    }

    reviewPopup(detailData){ //detail product
      console.log('Comentario ', detailData)
      this.embryoService.reviewPopup(detailData);
   }

}