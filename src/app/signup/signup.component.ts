import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../model/user';
import { Formatters } from '../helpers/formatters';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
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
        this.router.navigate([Formatters.makeRedirectUrl(userDetails)]);
      }
    });
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
      this.authenticationService.signup(this.user).subscribe({
        next: (response: any) => {
          const userDetails = Formatters.createUserDetails(this.user, response);
          this.authenticationService.setLoggedInUser(userDetails);
          this.router.navigate([Formatters.makeRedirectUrl(userDetails)]);
        },
        error: (error) => {
          this.loading = false;
          this.signuperror = error;
          this.dangerBox = true;
          this.user.roles = [];
          this.submitattempt = true;
        },
      });
    } else {
      this.submitattempt = true;
      this.dangerBox = false;
    }
  }
}
