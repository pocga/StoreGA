import { Component, OnInit,Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute, Params }   from '@angular/router';

@Component({
  selector: 'app-thakpopup',
  templateUrl: './thank-popup.component.html',
  styleUrls: ['./thank-popup.component.scss']
})
export class ThankPopupComponent implements OnInit {
  
  @Input() res : any;

   constructor(public dialogRef: MatDialogRef<ThankPopupComponent>) {
     
   }

   ngOnInit() {
     
   }

}