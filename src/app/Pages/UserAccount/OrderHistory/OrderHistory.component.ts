
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

         this.order_history = this.dataSource;
         console.log(this.datosPedidos)
       });
   }

   PedidoPopup(orderid){
      console.log(orderid)
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
      let resultado;
      
      this.embryoService.deleteOrder(value).subscribe((res: HttpResponse<any>) => {
         resultado = res.statusText;
         console.log(res);
         },
         (error) => {
         console.log(error)
         
         }
           ); 
           this.callPedidos();
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