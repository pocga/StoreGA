import { Injectable } from '@angular/core';

export interface Menu {
	state: string;
	name?: string;
	type?: string;
	icon?: string;
	children?: Menu[];
}

const HeaderOneItems= [
 
]

@Injectable()
export class MenuItems {

   getMainMenu(): Menu[] {
      return HeaderOneItems;
   }

}
