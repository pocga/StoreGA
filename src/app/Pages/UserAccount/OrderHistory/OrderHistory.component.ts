
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmbryoService } from '../../../Services/Embryo.service';

const order_history = [
   { orderid:1801, name: 'JUANA LOPEZ', price: 1.0079, status: 'Sent',action:''},
   { orderid:1832, name: 'CARLOS TORO', price: 4.0026, status: 'In processing',action:''},
   { orderid:1881, name: 'ANA AGUIRRE', price: 6.941, status: 'Sent',action:''},
   { orderid:1832, name: 'LUCAS CEBALLOS', price: 9.0122, status: 'Return',action:''},
   { orderid:1810, name: 'LAURA POSADA', price: 10.811, status: 'Sent',action:''},
];

@Component({
  selector: 'app-OrderHistory',
  templateUrl: './OrderHistory.component.html',
  styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {
   
   displayedColumns = ['orderid', 'name', 'price', 'status','action'];
   dataSource = order_history;

   public  id_reserve: string;

   constructor(public embryoService : EmbryoService) { }

   ngOnInit() {
      this.ordernarDesc(order_history, 'orderid'); 
      console.log(order_history);
   }

   reviewPopup(detailData){ //detail product
      this.embryoService.reviewPopup(detailData);
   }
   searchOrder(id_reserve){ 
      console.log(id_reserve);
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
