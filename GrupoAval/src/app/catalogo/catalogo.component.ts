import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['../app.component.scss']
})
export class CatalogoComponent implements OnInit {
  public categorias=[];
  constructor( ) { }

  ngOnInit() {
    var categorias1= ['Tvs','PCs','Celulares','Tablets','Consola','Play'];
    this.categorias=categorias1;
  }


   //slider precio
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b class="values-precio"></b> $' + value;
          //return '<b class="values-precio"> min:</b> $' + value;
        case LabelType.High:
          return '<b class="values-precio"> </b> $' + value;
            //return '<b class="values-precio"> max:</b> $' + value;
        default:
          return '$' + value;
        }
      }
  };//

  
  
}
