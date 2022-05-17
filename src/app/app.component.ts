import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { DetailsUtilisateur } from './model/details-utilisateur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Social Network';

  userDetails: DetailsUtilisateur | null | undefined;
  redirectUrl: string | undefined;
  /*@Input()*/ isAuthenticated : boolean = false



  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
    this.checkLocalStorage()
  }

  checkLocalStorage(){
    if(!localStorage.getItem('userDetails')){
      this.logout()
    }
  }

  hasRole(rolename: string): boolean {
    let flag = false;
    if (this.userDetails) {
      this.userDetails.roles.forEach((role) => {
        if (role === rolename) flag = true;
      });
    }
    return flag;
  }

  makeRedirectUrl(): string {
    let redirectUrl: string | null = null;
    if (this.hasRole('PROFESSIONNEL') || this.hasRole('UTILISATEUR'))
      redirectUrl = '/feed';
    else if (this.hasRole('ADMINISTRATEUR')) redirectUrl = '/admin';
    else redirectUrl = '/login';

    return redirectUrl;
  }

  logout() {
    this.authService.logout();
  }
}
