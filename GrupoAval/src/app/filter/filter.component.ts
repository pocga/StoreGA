import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['../app.component.scss']
})

export class FilterComponent implements OnInit {

  constructor(public router: Router) { }
  
  public categorias=[];
  public cont_categorias=0;

  ngOnInit() {

    var data = [ {categorias: 'TVs', disponibilidad: 'si', precio: 400},
	  {categorias: 'PCs', disponibilidad: 'no', precio: 1580},
	  {categorias: 'Celulares', disponibilidad: 'no', precio: 700},
	  {categorias: 'Tablets', disponibilidad: 'no', precio: 360},
	  {categorias: 'Consola', disponibilidad: 'si', precio: 500},
	  {categorias: 'Play', disponibilidad: 'si',precio: 1234},
   ];
    console.log(data);
    console.log(data[0]); //fila uno
    var categorias1= ['Tvs','PCs','Celulares','Tablets','Consola','Play'];
    this.categorias=categorias1;
  }
  routerFiltros(){
    this.router.navigate(['/filtros']);
  }

}
/*
{
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
*/