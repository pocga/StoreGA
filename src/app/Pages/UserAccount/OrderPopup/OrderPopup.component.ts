
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-OrderPopup',
  templateUrl: './OrderPopup.component.html',
  //styleUrls: ['./OrderPopup.component.scss']
})
export class OrderPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderPopupComponent>) { }

  ngOnInit() {
  }

}