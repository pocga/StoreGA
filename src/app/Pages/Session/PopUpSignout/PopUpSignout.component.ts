import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import { EmbryoService } from 'src/app/Services/Embryo.service';


@Component({
  selector: 'app-PopUpSignout',
  templateUrl: './PopUpSignout.component.html'
  
})
export class PopUpSignoutComponent implements OnInit {

   message : string;
   public embryoService : EmbryoService
   constructor(public dialogRef: MatDialogRef<PopUpSignoutComponent>) { }

   ngOnInit() {
   }

   removeCart(){
    
    this.dialogRef.close();
  }
   
}