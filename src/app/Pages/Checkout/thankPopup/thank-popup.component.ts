import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute, Params }   from '@angular/router';

@Component({
  selector: 'app-thakpopup',
  templateUrl: './thank-popup.component.html'
  
})
export class ThankPopupComponent implements OnInit {

   constructor(public dialogRef: MatDialogRef<ThankPopupComponent>) {
     
   }

   ngOnInit() {
   }

}