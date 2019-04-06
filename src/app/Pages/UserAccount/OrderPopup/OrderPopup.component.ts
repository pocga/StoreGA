
import { Component, OnInit,Input} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { elementContainerEnd } from '@angular/core/src/render3';

@Component({
  selector: 'app-OrderPopup',
  templateUrl: './OrderPopup.component.html',
  styleUrls: ['./OrderPopup.component.scss']
})
export class OrderPopupComponent implements OnInit {
  private productsDetail : any;
  private total : number = 0;
  private totalShow : any;
  @Input() orderid : any;
  @Input() totales : any;

  private totalPedido: any;

  constructor(public dialogRef: MatDialogRef<OrderPopupComponent>) { }

  ngOnInit() {
    console.log(this.orderid)
    console.log(this.totales)
    this.totalPedido=this.totales[0];
    console.log(this.totalPedido)


    this.productsDetail = this.orderid;
    console.log(this.productsDetail)
    this.productsDetail.forEach(element => {
      let subtotal = element.producto.precio * element.cantidad
      this.total += subtotal
    });
  }

}