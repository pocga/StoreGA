import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from 'src/app/Services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = sessionStorage.getItem('idToken');
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });  
    return next.handle(request)
    .pipe(tap(event => {
     if (event instanceof HttpResponse) {
        }
    }, error => {
          })
        )
  }
}
