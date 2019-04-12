import { Injectable } from '@angular/core';
import {CognitoAuth} from 'amazon-cognito-auth-js';
import * as jwt_decode from "jwt-decode";

@Injectable()

export class AuthService {

  public auth:any;

  constructor() {
    this.auth = this.initCognitoSDK() //instance CognitoAuth
  }
  public initCognitoSDK(){
      let thisAux = this;
      const  authData = { // data UserPool
        
      // Producción
          ClientId : '4l482gmr6vl5vs55k8hh4t0ol2', // Your client id here
          AppWebDomain : 'tech-shop.auth.us-east-1.amazoncognito.com',
          TokenScopesArray : ['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
          RedirectUriSignIn : 'https://www.techshopga.com/managetoken',
          RedirectUriSignOut : 'https://www.techshopga.com/signout',
          IdentityProvider : '', // e.g. 'Facebook',
          UserPoolId : 'us-east-1_CVePKGhTu', // Your user pool id here
          AdvancedSecurityDataCollectionFlag : false, // e.g. true
          Storage: '' // OPTIONAL e.g. new CookieStorage(), to use the specified storage provided
      /*
          //Desarrollo
          ClientId : 'iq5d9op5dpme4mqgsogedr56h', // Your client id here
          AppWebDomain : 'tech-shop-dev.auth.us-east-1.amazoncognito.com',
          TokenScopesArray : ['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
          RedirectUriSignIn : 'https://localhost:4200/managetoken',
          RedirectUriSignOut : 'https://localhost:4200/signout',
          IdentityProvider : '', // e.g. 'Facebook',
          UserPoolId : 'us-east-1_JpBGocsnE', // Your user pool id here
          AdvancedSecurityDataCollectionFlag : false, // e.g. true
          Storage: '' // OPTIONAL e.g. new CookieStorage(), to use the specified storage provided
    */
    };

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
     return  auth 

  }

  public isLoggedIn(){ 

    if(this.auth.isUserSignedIn()){ 
          return true 
      }
      return false 
  }

  public signIn(){
      this.auth.getSession() 
    }

  public singOut(){

    this.auth.signOut(); 
    localStorage.clear(); 
    sessionStorage.clear(); 
  }

  public getToken(): string {
    return localStorage.getItem('idToken');
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
