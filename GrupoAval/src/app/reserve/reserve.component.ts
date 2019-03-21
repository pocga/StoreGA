import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.sass']
})
export class ReserveComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  returnMenu(){
    this.router.navigate(['/menu']);
  }

}
/*<div class="login-pag">
  <div class="login-shop">
    <div>
      <h1>Gracias por su reserva</h1>
    </div>
    <div>
      <h4>ID de reserva ..</h4>
      <h4>datos ..</h4>
    </div>
    <button class="button-login" (click)="returnMenu()" >Cerrar</button><br><br>
  </div>
</div>
*/