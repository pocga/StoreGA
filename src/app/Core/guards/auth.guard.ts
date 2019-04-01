import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public _autService:AuthService, public router: Router){}

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this._autService.isLoggedIn()){
          return true

    }

        this._autService.signIn();
        return false;

   }
}
