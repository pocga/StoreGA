import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignOutComponent implements OnInit{

  ngOnInit(){

  }
    ngAfterViewInit(){
      //document.getElementById('preloader').classList.add('hide');
    }
}
