import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  token: string;

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token') || '';
    if (this.token) {
      const tokenizedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token),
      });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }
}
