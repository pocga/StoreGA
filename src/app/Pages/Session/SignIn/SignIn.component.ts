import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { EmbryoService } from 'src/app/Services/Embryo.service';

@Component({
  selector: 'signIn',
  templateUrl: './SignIn.component.html',
  styleUrls: ['./SignIn.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private _authService: AuthService,private router: Router,private embryoService:EmbryoService) { }

  ngOnInit() {
    let auth = this._authService.auth;  //get instance CognitoAuth
    let curUrl = window.location.href;  //get  Url location   with token return from CognitoAuth
    auth.parseCognitoWebResponse(curUrl); // pass Url to parseCognitoWebResponse function for storage token info
    let user= this.embryoService.token();
    let rol=user["custom:role"];
    
    if (rol=="Administrador"){
       
       this.router.navigate(['/order-history']);
    }else {
       
       this.router.navigate(['/home']);
    }    

    //when CognitoAuth return success then redirect to home
   // this.router.navigate(['/order-history']);
    
  }

}
