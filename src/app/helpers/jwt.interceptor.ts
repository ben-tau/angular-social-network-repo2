import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
// import { DetailsUtilisateur } from '../model/details-utilisateur';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let token: string | null = null;
    this.authenticationService
      .getLoggedInUser()
      .subscribe((userDetails: any) => {
        if (userDetails) token = userDetails.token;
      });
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    return next.handle(request);
  }
}
