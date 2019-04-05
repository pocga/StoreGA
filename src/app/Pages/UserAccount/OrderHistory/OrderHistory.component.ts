
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmbryoService } from '../../../Services/Embryo.service';
import { NumericSelectorState } from 'angular-instantsearch/numeric-selector/numeric-selector';
import { element } from '@angular/core/src/render3';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-OrderHistory',
  templateUrl: './OrderHistory.component.html',
  styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {
   
   displayedColumns = ['orderid', 'name', 'fecha','action','eliminar'];
   public datosPedidos=[];
   public id_reserve: any;
   public order_history: any;
   public dataSource: any;
   popupResponse  : any;
   public administrador: boolean
   public desactivar:boolean=false;

   constructor(public embryoService : EmbryoService) { }

   ngOnInit() {
      this.callPedidos();
      let user= this.embryoService.token();
      let rol=user["custom:role"];
      //let username=user["cognito:username"]       
      if (rol=="Administrador"){
         this.administrador=true;         
      }else {
         this.administrador=false;  
      }  

      
 
   }

   public callPedidos(){
      
      this.embryoService.getPedidos().subscribe(response => {
         this.datosPedidos = Object.keys(response).map(key => response[key]);
         console.log(this.datosPedidos)
        this.dataSource = this.datosPedidos.map(pedido => {
            return {
                    "orderid": pedido.idPedido,
                    "name": pedido.usuario.email,
                    "fecha" : pedido.fecha,
                   
                    "action":'',
                    "eliminar":'',
                    "pedidos": pedido.productos
                  }
         })
         
         this.order_history = this.dataSource;      
         this.ordernarDesc(this.dataSource,'fecha' );
         let arrayOrdenado = this.dataSource.sort((a,b)=> Number(new Date(a.fecha)) - Number(new Date(b.fecha)));
         this.ordernarDesc(this.dataSource,'fecha' );
      },err => console.log(err),);
   }

   PedidoPopup(orderid){
      this.embryoService.PedidoPopup(orderid);   
   }
   /*
   reviewPopup(detailData){ //detail product
      this.embryoService.reviewPopup(detailData);
   }*/
   limpiar(){
      this.dataSource = this.order_history;
      this.id_reserve = "";
      this.desactivar=false;
   }

   deletePedido(value){
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
         this.embryoService.deleteOrder(value).subscribe((res: HttpResponse<any>) => {
            resultado = res.statusText;
            this.id_reserve = "";
            this.callPedidos();
            },
            (error) => {
            console.log(error)
            }
              ); 
                  
      }
   }


   

   searchOrder(id_reserve){
      this.dataSource = this.order_history;
      let cont=0;
      for (var i=0;i<this.dataSource.length;i++){ 
         if ( this.dataSource[i].orderid == id_reserve ){
            this.dataSource=[this.dataSource[i]]
            cont++;
            this.desactivar=false;
         } 
      }
      if (cont==0){
         this.dataSource=[''];
         this.id_reserve = "";
         this.desactivar=true;
      }
   }

   public  ordenarAsc(p_array_json, p_key) {
      p_array_json.sort(function (a, b) {
         return a[p_key] > b[p_key];
      });
   }
   
   public ordernarDesc(p_array_json, p_key){
      this.ordenarAsc(p_array_json, p_key); p_array_json.reverse(); 
   }

}
