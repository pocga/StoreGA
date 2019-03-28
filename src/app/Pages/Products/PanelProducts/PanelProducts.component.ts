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
    public data =
    {
      "producto": 
      [
        {
            "idProducto": "T36005",
            "categoria": "TV",
            "cantidadDisponible": "10",
            "precio": "4000000",
            "descripcion": " Modelo UN55NU7300KXZL .Tecnologia LED.Resolucion 4K Ultra HD.Tama\ufffdo de la pantalla 55.Tama\ufffdo diagonal de pantalla en cm 139 cm.Contraste Mega contraste.Procesador Quad Core.Potencia de parlantes 20W.Alto (con/sin base) 79.3 cm/71.4 cm.Profundidad (con/sin base) 26.3 cm/10.4 cm.Ancho 123.6 cm.Pesa 18.5 kg.Garantia del proveedor de 1 a\ufffdo.Disponible en color negro ",
            "imagen": "https://media.wired.com/photos/5b32da5e1027fe1d7ddd1249/191:100/pass/lgtvthing.jpg",
            "miniatura": "https://www.electromuebles.com.co/wp-content/uploads/2017/12/TELEVISOR-LG-55-PULGADAS-55UJ635T-93.jpg"
        },
        {
                  "idProducto": "CEL3600543",
                  "categoria": "Celular",
                  "cantidadDisponible": "10",
                  "precio": "4000000",
                  "descripcion": " Modelo UN55NU7300KXZL .Tecnologia LED.Resolucion 4K Ultra HD.Tama\ufffdo de la pantalla 55.Tama\ufffdo diagonal de pantalla en cm 139 cm.Contraste Mega contraste.Procesador Quad Core.Potencia de parlantes 20W.Alto (con/sin base) 79.3 cm/71.4 cm.Profundidad (con/sin base) 26.3 cm/10.4 cm.Ancho 123.6 cm.Pesa 18.5 kg.Garantia del proveedor de 1 a\ufffdo.Disponible en color negro ",
                  "imagen": "https://media.wired.com/photos/5b32da5e1027fe1d7ddd1249/191:100/pass/lgtvthing.jpg",
                  "miniatura": "https://media.aws.alkosto.com/media/catalog/product/cache/1/image/660x441/9df78eab33525d08d6e5fb8d27136e95/c/o/co-galaxy-j2-prime-g532m-sm-g532mzsdcoo-frontsilver-73620689.jpg"

        },
        {
                  "idProducto": "COMP3600543",
                  "categoria": "Computador",
                  "cantidadDisponible": "10",
                  "precio": "4000000",
                  "descripcion": " Modelo UN55NU7300KXZL .Tecnologia LED.Resolucion 4K Ultra HD.Tama\ufffdo de la pantalla 55.Tama\ufffdo diagonal de pantalla en cm 139 cm.Contraste Mega contraste.Procesador Quad Core.Potencia de parlantes 20W.Alto (con/sin base) 79.3 cm/71.4 cm.Profundidad (con/sin base) 26.3 cm/10.4 cm.Ancho 123.6 cm.Pesa 18.5 kg.Garantia del proveedor de 1 a\ufffdo.Disponible en color negro ",
                  "imagen": "https://media.wired.com/photos/5b32da5e1027fe1d7ddd1249/191:100/pass/lgtvthing.jpg",
                  "miniatura": "https://marcimex.vteximg.com.br/arquivos/ids/158137-700-700/computador-HP-all-in-one-22-c000la-pavilion-14346_1.jpg?v=636715792844500000"

        },
        {
          "idProducto": "COMP3600543",
          "categoria": "Computador",
          "cantidadDisponible": "10",
          "precio": "4000000",
          "descripcion": " Modelo UN55NU7300KXZL .Tecnologia LED.Resolucion 4K Ultra HD.Tama\ufffdo de la pantalla 55.Tama\ufffdo diagonal de pantalla en cm 139 cm.Contraste Mega contraste.Procesador Quad Core.Potencia de parlantes 20W.Alto (con/sin base) 79.3 cm/71.4 cm.Profundidad (con/sin base) 26.3 cm/10.4 cm.Ancho 123.6 cm.Pesa 18.5 kg.Garantia del proveedor de 1 a\ufffdo.Disponible en color negro ",
          "imagen": "https://media.wired.com/photos/5b32da5e1027fe1d7ddd1249/191:100/pass/lgtvthing.jpg",
          "miniatura": "https://marcimex.vteximg.com.br/arquivos/ids/158137-700-700/computador-HP-all-in-one-22-c000la-pavilion-14346_1.jpg?v=636715792844500000"

        },
        {
          "idProducto": "COMP3600543",
          "categoria": "Computador",
          "cantidadDisponible": "10",
          "precio": "4000000",
          "descripcion": " Modelo UN55NU7300KXZL .Tecnologia LED.Resolucion 4K Ultra HD.Tama\ufffdo de la pantalla 55.Tama\ufffdo diagonal de pantalla en cm 139 cm.Contraste Mega contraste.Procesador Quad Core.Potencia de parlantes 20W.Alto (con/sin base) 79.3 cm/71.4 cm.Profundidad (con/sin base) 26.3 cm/10.4 cm.Ancho 123.6 cm.Pesa 18.5 kg.Garantia del proveedor de 1 a\ufffdo.Disponible en color negro ",
          "imagen": "https://media.wired.com/photos/5b32da5e1027fe1d7ddd1249/191:100/pass/lgtvthing.jpg",
          "miniatura": "https://marcimex.vteximg.com.br/arquivos/ids/158137-700-700/computador-HP-all-in-one-22-c000la-pavilion-14346_1.jpg?v=636715792844500000"

      },
      {
        "idProducto": "COMP3600543",
        "categoria": "Computador",
        "cantidadDisponible": "10",
        "precio": "4000000",
        "descripcion": " Modelo UN55NU7300KXZL .Tecnologia LED.Resolucion 4K Ultra HD.Tama\ufffdo de la pantalla 55.Tama\ufffdo diagonal de pantalla en cm 139 cm.Contraste Mega contraste.Procesador Quad Core.Potencia de parlantes 20W.Alto (con/sin base) 79.3 cm/71.4 cm.Profundidad (con/sin base) 26.3 cm/10.4 cm.Ancho 123.6 cm.Pesa 18.5 kg.Garantia del proveedor de 1 a\ufffdo.Disponible en color negro ",
        "imagen": "https://media.wired.com/photos/5b32da5e1027fe1d7ddd1249/191:100/pass/lgtvthing.jpg",
        "miniatura": "https://marcimex.vteximg.com.br/arquivos/ids/158137-700-700/computador-HP-all-in-one-22-c000la-pavilion-14346_1.jpg?v=636715792844500000"

},
{
  "idProducto": "COMP3600543",
  "categoria": "Computador",
  "cantidadDisponible": "10",
  "precio": "4000000",
  "descripcion": " Modelo UN55NU7300KXZL .Tecnologia LED.Resolucion 4K Ultra HD.Tama\ufffdo de la pantalla 55.Tama\ufffdo diagonal de pantalla en cm 139 cm.Contraste Mega contraste.Procesador Quad Core.Potencia de parlantes 20W.Alto (con/sin base) 79.3 cm/71.4 cm.Profundidad (con/sin base) 26.3 cm/10.4 cm.Ancho 123.6 cm.Pesa 18.5 kg.Garantia del proveedor de 1 a\ufffdo.Disponible en color negro ",
  "imagen": "https://media.wired.com/photos/5b32da5e1027fe1d7ddd1249/191:100/pass/lgtvthing.jpg",
  "miniatura": "https://marcimex.vteximg.com.br/arquivos/ids/158137-700-700/computador-HP-all-in-one-22-c000la-pavilion-14346_1.jpg?v=636715792844500000"

}

    ]
} 
    
   constructor(private embryoService:EmbryoService,private toastyService: ToastaService ) {
   }

   ngOnInit() {
    


   }

  
  

  public addToCart(value:any) {
    this.embryoService.addToCart(value);
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
  checkProducts(){

        this.index++;
        if (this.index >=1){
        this.products_list = true;
        }

    }

    reviewPopup(detailData){ //detail product
      console.log('Comentario ', detailData)
      this.embryoService.reviewPopup(detailData);
   }

}