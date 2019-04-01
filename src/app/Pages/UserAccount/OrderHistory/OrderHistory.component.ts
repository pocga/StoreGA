
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
   
   displayedColumns = ['orderid', 'name', 'fecha', 'status','action','eliminar'];
   public datosPedidos=[];
   public id_reserve: any;
   public order_history: any;
   public dataSource: any;
   popupResponse  : any;

   constructor(public embryoService : EmbryoService) { }

   ngOnInit() {
      this.callPedidos();
 
   }

   public callPedidos(){
      this.embryoService.getPedidos().subscribe(response => {
         this.datosPedidos = Object.keys(response).map(key => response[key]);
         
        this.dataSource = this.datosPedidos.map(pedido => {
            return {
                    "orderid": pedido.idPedido,
                    "name": pedido.idUsuario,
                    "fecha" : pedido.fecha,
                    "status":'Enviado',
                    "action":'',
                    "eliminar":'',
                    "pedidos": pedido.productos
                  }
         })
         
         this.ordernarDesc(this.dataSource,'fecha');
         this.order_history = this.dataSource;
       });
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
   }

   deletePedido(value){
      console.log(value)
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
            this.callPedidos();
            },
            (error) => {
            console.log(error)
            }
              ); 
                  
      }
   }


   searchOrder(id_reserve){
      for (var i=0;i<this.dataSource.length;i++){ 
         if ( this.dataSource[i].orderid == id_reserve ){
            this.dataSource=[this.dataSource[i]]
         }
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
