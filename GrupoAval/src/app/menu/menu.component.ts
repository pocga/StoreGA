import { Component, OnInit } from '@angular/core';
import { TvComponent } from '../filter/tv/tv.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../app.component.scss']
})
export class MenuComponent implements OnInit {
  
  constructor( public router: Router) { }

  ngOnInit() {
  }

  shopCar(){
    this.router.navigate(['/shopCar']);
  }

  checkOrder(){
    this.router.navigate(['/checkOrder']);
  }

  routerTvs(){
    console.log("tvs");
  }

  routerPCs(){
    console.log("PcS");
  }
  routerCelulares(){
    console.log("Celular");
  }
  routerTablets(){
    console.log("Tableys");
  } 

}
