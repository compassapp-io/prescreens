import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = localStorage.getItem('Token');
        if (token && !request.url.endsWith('/Auth')) {
            let parsedAToken = JSON.parse(token);
            if (parsedAToken) {
                request = request.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + parsedAToken
                    }
                });
            }
        }

        return next.handle(request);
    }
}