import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../model/user';
import { Formatters } from '../helpers/formatters';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User | undefined | null;
  model: any = {};
  loading = false;
  returnUrl: string | undefined;
  loginerror: any;
  loginmsg: string | undefined;
  dangerBox = false;
  submitattempt = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    document.body.className = 'selector';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authenticationService.getLoggedInUser().subscribe((userDetails) => {
      if (userDetails) {
        this.router.navigate([Formatters.makeRedirectUrl(userDetails)]);
      }
    });
  }

  login(loginform: any) {
    if (loginform.form.valid) {
      this.loading = true;
      this.authenticationService
        .login(this.model.nomUtilisateur, this.model.motDePasse)
        .subscribe({
          next: (response) => {
            //console.log('response', response);
            // const userDetails = new DetailsUtilisateur();
            // this.user = response.body;
            // userDetails.id = this.user?.id;

            // userDetails.token = response.headers.get('Authorization');
            // this.user?.roles.forEach((role) => {
            //   if (role.nom === 'ADMINISTRATEUR') this.returnUrl = '/admin';
            //   else if (role.nom === 'ENTREPRISE' || role.nom === 'UTILISATEUR')
            //     this.returnUrl = '/feed';

            //   userDetails.roles.push(role.nom);
            // });

            // this.route.queryParams.subscribe((params) => {
            //   if (params && params['returnUrl']) {
            //     this.router.navigate([params['returnUrl']]).then(() => {
            //       location.reload();
            //     });
            //   } else
            //     this.router.navigate([Formatters.makeRedirectUrl(userDetails)]);
            // });

            const userDetails = Formatters.createUserDetails(
              this.user,
              response
            );

            this.authenticationService.setLoggedInUser(userDetails);
            this.router.navigate([Formatters.makeRedirectUrl(userDetails)]);
          },
          error: (error) => {
            this.loading = false;
            this.loginerror = error;
            if (error.error.message === 'Bad credentials') {
              this.loginmsg = 'Login ou mot de passe invalide';
            }
            this.dangerBox = true;
            this.submitattempt = true;
          },
        });
    } else {
      this.submitattempt = true;
      this.dangerBox = false;
    }
  }
}
