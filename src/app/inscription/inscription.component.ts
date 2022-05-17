import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../model/user';
import { UserDetails } from '../model/user-details';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  user: User = new User();
  loading = false;
  returnUrl: string | undefined;
  signuperror: any;
  dangerBox = false;
  submitattempt = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    document.body.className = 'selector';
    this.authenticationService.getLoggedInUser().subscribe((userDetails) => {
      if (userDetails) {
        this.router.navigate([this.redirect(userDetails)]);
      }
    });
  }

  redirect(userDetails: UserDetails): string | null {
    let redirectUrl: string | null = null;
    if (
      this.hasRole('ENTRENPRISE', userDetails) ||
      this.hasRole('UTILISATEUR', userDetails)
    )
      redirectUrl = '/feed';
    else if (this.hasRole('ADMINISTRATEUR', userDetails))
      redirectUrl = '/admin';

    return redirectUrl;
  }

  hasRole(rolename: string, userDetails: UserDetails): boolean {
    let r = false;
    if (userDetails) {
      userDetails.roles.forEach((role) => {
        if (role === rolename) r = true;
      });
    }
    return r;
  }

  signup(signupForm: any) {
    if (
      signupForm.form.valid &&
      this.user?.motDePasse === this.user?.motDePasseConf
    ) {
      // const formWrapper = new FormData();
      // const userBlob = new Blob([JSON.stringify(this.user)], {
      //   type: 'application/json',
      // });
      // formWrapper.append('object', userBlob);
      this.loading = true;
      this.authenticationService.signup(this.user).subscribe(
        (response: any) => {
          const userDetails = new UserDetails();
          this.user = response.body;
          userDetails.token = response.headers.get('Authorization');
          userDetails.id = this.user?.id;
          this.user?.roles.forEach((role) => {
            userDetails.roles.push(role.nom);
          });
          this.authenticationService.setLoggedInUser(userDetails);
          this.router.navigate([this.redirect(userDetails)]);
        },
        (error) => {
          this.loading = false;
          this.signuperror = error;
          this.dangerBox = true;
          this.user.roles = [];
          this.submitattempt = true;
        }
      );
    } else {
      this.submitattempt = true;
      this.dangerBox = false;
    }
  }
}
