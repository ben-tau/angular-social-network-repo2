import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavigationEnd, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DetailsUtilisateur } from '../model/details-utilisateur';
import { Utilisateur } from '../model/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
// import { WallPublicationsComponent } from '../mur-publications/mur-publications.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: /*'app-navbar'*/'[app-navbar]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit{
  ngOnInit(): void{
    
  }
}

// export class NavbarComponent implements OnInit {
//   userDetails: DetailsUtilisateur | undefined;
//   redirectUrl: string | undefined;
//   user: Utilisateur = new Utilisateur();

//   constructor(
//     private authService: AuthenticationService,
//     private router: Router,
//     private userService: UtilisateurService,
//     private route: ActivatedRoute,
//     private domSanitizer: DomSanitizer
//   ) {}

//   ngOnInit(): void {
//     this.authService.getLoggedInUser().subscribe((userDetails: any) => {
//       this.userDetails = userDetails;
//     });

//     this.userService.getUser(this.userDetails?.id?.toString()).subscribe(
//       (user) => {
//         Object.assign(this.user, user);
//       },
//       (error) => {
//         if (this.userDetails)
//           this.router
//             .navigate(['/in', this.userDetails.id?.toString()])
//             .then(() => {
//               location.reload();
//             });
//         else
//           this.router.navigate(['/feed']).then(() => {
//             location.reload();
//           });
//       }
//     );
//   }

//   logout() {
//     this.authService.logout();
//   }

//   makeRedirectUrl(userDetails: DetailsUtilisateur): string {
//     let redirectUrl: string;
//     if (
//       this.hasRole('PROFESSIONAL', userDetails) ||
//       this.hasRole('USER', userDetails)
//     )
//       redirectUrl = '/feed';
//     else if (this.hasRole('ADMIN', userDetails)) redirectUrl = '/admin';
//     else redirectUrl = '/login';

//     return redirectUrl;
//   }

//   hasRole(rolename: string, userDetails: DetailsUtilisateur): boolean {
//     let flag = false;
//     if (userDetails) {
//       userDetails.roles.forEach((role) => {
//         if (role === rolename) flag = true;
//       });
//     }
//     return flag;
//   }

//   goToProfile() {
//     this.router
//       .navigate(['/users/' + this.userDetails?.id?.toString()])
//       .then(() => {
//         location.reload();
//       });
//   }

//   displayProfilePhoto(): any {
//     if (this.user.photoProfile) {
//       if (this.user.photoProfile.type === 'image/png')
//         return this.domSanitizer.bypassSecurityTrustUrl(
//           'data:image/png;base64,' + this.user.photoProfile.bytes
//         );
//       else if (this.user.photoProfile.type === 'image/jpeg')
//         return this.domSanitizer.bypassSecurityTrustUrl(
//           'data:image/jpeg;base64,' + this.user.photoProfile.bytes
//         );
//     }
//     return null;
//   }
// }
