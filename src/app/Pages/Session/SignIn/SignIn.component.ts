import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signIn',
  templateUrl: './SignIn.component.html',
  styleUrls: ['./SignIn.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private _authService: AuthService,private router: Router) { }

  ngOnInit() {
    let auth = this._authService.auth;  //get instance CognitoAuth

    let curUrl = window.location.href;  //get  Url location   with token return from CognitoAuth
    console.log(curUrl)
    auth.parseCognitoWebResponse(curUrl); // pass Url to parseCognitoWebResponse function for storage token info
    console.log("hola")
    this.router.navigate(['/home']); //when CognitoAuth return success then redirect to home
  }

}
