import { Component, OnInit } from '@angular/core';
import { TvComponent } from '../filter/tv/tv.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../app.component.scss']
})
export class MenuComponent implements OnInit {
  
  constructor( ) { }

  ngOnInit() {
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
