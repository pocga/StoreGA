import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { EmbryoService } from '../../Services/Embryo.service';

@Component({
  selector: 'app-ReviewPopup',
  templateUrl: './ReviewPopup.component.html',
  styleUrls: ['./ReviewPopup.component.scss']
})
export class ReviewPopupComponent implements OnInit {
  private route: ActivatedRoute;
  private router: Router;

  @Input() detailData : any;//
  singleProductDetails : any;//
  reviews : any;//


  id                : any;
  type              : any;
  apiResponse       : any;
  singleProductData : any;
  productsList      : any;

  
  

  constructor( public dialogRef: MatDialogRef<ReviewPopupComponent>) { 
 
  }
   ngOnInit() {
     


  }
 



}
