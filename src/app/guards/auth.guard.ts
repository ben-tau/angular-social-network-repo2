import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      this.authService.getLoggedInUser().subscribe({
        next: (userDetails) => {
          if (!userDetails?.isActif) {
            this.router.navigate(['/suspended']);
            return true;
          } else {
            // logged in so return true
            return true;
          }
        },
        error: (err) => {
          console.log(err);
          return false;
        },
      });
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}
