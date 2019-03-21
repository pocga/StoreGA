import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['../app.component.scss']
})
export class ShopComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit() {
  }
  returnCatalogo(){
    this.router.navigate(['/menu']);
  }
  dataUsers(){
    this.router.navigate(['/datauser']);
  }
}
