import { Injectable } from '@angular/core';
import {CognitoAuth} from 'amazon-cognito-auth-js';
import * as jwt_decode from "jwt-decode";



@Injectable()

export class AuthService {

  public auth:any;


  //constructor(private menuItemsService: MenuItemsService) {
  constructor() {
    this.auth = this.initCognitoSDK() //instance CognitoAuth
  }
  public initCognitoSDK(){
      let thisAux = this;
      const  authData = { // data UserPool

          ClientId : 'iq5d9op5dpme4mqgsogedr56h', // Your client id here
          AppWebDomain : 'tech-shop-dev.auth.us-east-1.amazoncognito.com',
          TokenScopesArray : ['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
          RedirectUriSignIn : 'https://localhost:4200/managetoken',
          RedirectUriSignOut : 'https://localhost:4200/signout',
          IdentityProvider : '', // e.g. 'Facebook',
          UserPoolId : 'us-east-1_JpBGocsnE', // Your user pool id here
          AdvancedSecurityDataCollectionFlag : false, // e.g. true
          Storage: '' // OPTIONAL e.g. new CookieStorage(), to use the specified storage provided
      };
//

      let auth = new CognitoAuth(authData);

      auth.userhandler = {

          onSuccess: function(session) {

              let idToken = session.getIdToken().getJwtToken(); 
              localStorage.setItem("idToken", idToken ) 
              

          },
          onFailure: function(err) {

              alert("Error de autenticación! " + err);

          }
      };

     return  auth // @return instance CognitoAuth

  }


  public isLoggedIn(){ //validate session


    if(this.auth.isUserSignedIn()){ //validate if user is loged In cognito auth

          return true // if User is logedIn then return true
      }

      return false //  if User is'nt loged In then return false

  }


  public signIn(){

      this.auth.getSession() //get session cognito auth

    }

  public singOut(){

    this.auth.signOut(); //call signOut cognito auth
    localStorage.clear(); //Clear localStorage
    sessionStorage.clear(); //Clear SessionStorage

  }

  public getToken(): string {
    return localStorage.getItem('idToken');
  }
  getDecodedAccessToken(token: string): any {
    try{

        return jwt_decode(token);//@return: token decode format json

    }
    catch(Error){
        return null;
    }

  }

}
