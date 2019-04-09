import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import { EmbryoService } from '../../Services/Embryo.service';

@Component({
  selector: 'app-ConfirmationPopup',
  templateUrl: './ConfirmationPopup.component.html',
  styleUrls: ['./ConfirmationPopup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

   message : string;
   public embryoService : EmbryoService
   constructor(public dialogRef: MatDialogRef<ConfirmationPopupComponent>) { }

   ngOnInit() {
   }

  removeCart(){
    this.dialogRef.close();
  }  
}
