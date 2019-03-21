import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { MatDialog, MatDialogRef } from  '@angular/material';
import { ReserveComponent } from '../reserve/reserve.component';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['../app.component.scss']
})
export class DataUserComponent implements OnInit {
  //private  dialog:  MatDialog
  constructor(public router: Router) { }

  ngOnInit() {
  }
  dataConfirm(){
   // this.router.navigate(['/reserve']); 
   //this.dialog.open(ReserveComponent,{ data: {
   // message:  "Error!!!"
   // }});
  }
  returnConfirm(){
    this.router.navigate(['/shopCar']);
  }
}
