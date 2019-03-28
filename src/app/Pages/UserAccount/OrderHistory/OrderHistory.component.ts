
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmbryoService } from '../../../Services/Embryo.service';
import { NumericSelectorState } from 'angular-instantsearch/numeric-selector/numeric-selector';

const order_history = [
   { orderid:5, name: 'JUANA LOPEZ', price: 1.0079, status: 'Sent',action:''},
   { orderid:7, name: 'CARLOS TORO', price: 5.0026, status: 'In processing',action:''},
   { orderid:9, name: 'ANA AGUIRRE', price: 6.941, status: 'Sent',action:''},
   { orderid:6, name: 'LUCAS CEBALLOS', price: 11.0122, status: 'Return',action:''},
   { orderid:4, name: 'LAURA POSADA', price: 10.811, status: 'Sent',action:''},
];

@Component({
  selector: 'app-OrderHistory',
  templateUrl: './OrderHistory.component.html',
  styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {
   
   displayedColumns = ['orderid', 'name', 'price', 'status','action'];
   dataSource = order_history;
   

  
   public  id_reserve: number;

   constructor(public embryoService : EmbryoService) { }

   ngOnInit() {
      this.ordernarDesc(order_history,'orderid');   
     // this.ordernarDesc(order_history,''); 
      console.log(order_history);
     // console.log(data.orderid);
   }
   PedidoPopup(orderid){
      console.log("ID: "+ orderid);
      this.embryoService.PedidoPopup(orderid);   
   }
   /*
   reviewPopup(detailData){ //detail product
      this.embryoService.reviewPopup(detailData);
   }*/
   limpiar(){
      console.log("limpiar");
      this.dataSource=order_history;
   }
   searchOrder(id_reserve){ 
      id_reserve = parseInt(id_reserve);     
      for (var i=0;i<order_history.length;i++){ 
         if (order_history[i].orderid==id_reserve){
            this.dataSource=[order_history[i]]
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
