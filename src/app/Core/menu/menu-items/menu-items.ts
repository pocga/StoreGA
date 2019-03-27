import { Injectable } from '@angular/core';

/*
 * Menu interface
 */
export interface Menu {
	state: string;
	name?: string;
	type?: string;
	icon?: string;
	children?: Menu[];
}

//var categorias=['TV','PC','CELULARES'];

const HeaderOneItems= [
 /* {
    state: "home",
    name: 'VER CATALOGO',
    type: "sub",
    icon: "home",
  }
  {
    state: "home",
    name: categorias[1],
    type: "sub",
    icon: "home",
  },
  {
    state: "home",
    name: categorias[2],
    type: "sub",
    icon: "home",
  }*/
]



@Injectable()
export class MenuItems {

   /*
    * Get all header menu
    */
   
   getMainMenu(): Menu[] {
      return HeaderOneItems;
   }

   /*
    * Get all footer menu
    */
}
