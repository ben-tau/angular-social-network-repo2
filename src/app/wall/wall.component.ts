import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from '../model/publication';
import { Utilisateur } from '../model/utilisateur';
// import { UtilisateurService } from '../services/utilisateur.service';
import { WallPostsComponent } from './posts/posts.component';
import { DomSanitizer } from '@angular/platform-browser';
// import { ReseauService } from '../services/reseau.service';
import { Formatters } from '../helpers/formatters';
=======
import { Router } from '@angular/router';
>>>>>>> 93a5a910af75f073332b8498bee00c90b492c66b
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit {
  userDetails!: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.authenticationService.getLoggedInUser().subscribe((userDetails) => {
      if (!userDetails) {
        this.router.navigate(['/login']);
      }
    });
    this.getStorage();
  }

  getStorage() {
    let storage = localStorage.getItem('userDetails');
    if (storage) {
      this.userDetails = JSON.parse(storage);
    }
  }
}

// export class WallComponent implements OnInit {
//   @ViewChild(WallPostsComponent) child:
//     | WallPostsComponent
//     | undefined;
//   message: string | undefined;
//   posts: Publication[] = new Array<Publication>();
//   user: Utilisateur = new Utilisateur();
//   userDetails: DetailsUtilisateur | undefined;
//   network: Utilisateur[] = new Array<Utilisateur>();

//   constructor(
//     private router: Router,
//     private authenticationService: AuthenticationService,
//     private userService: UtilisateurService,
//     private route: ActivatedRoute,
//     private domSanitizer: DomSanitizer,
//     private networkService: ReseauService
//   ) {}

//   ngOnInit(): void {
//     this.authenticationService
//       .getLoggedInUser()
//       .subscribe((userDetails: any) => {
//         this.userDetails = userDetails;
//       });

//     this.userService.getUser(this.userDetails?.id?.toString()).subscribe(
//       (user) => {
//         Object.assign(this.user, user);
//       },
//       (error) => {
//         if (this.userDetails)
//           this.router
//             .navigate(['/in', this.userDetails?.id?.toString()])
//             .then(() => {
//               location.reload();
//             });
//         else
//           this.router.navigate(['/feed']).then(() => {
//             location.reload();
//           });
//       }
//     );

//     this.networkService
//       .getNetwork(this.userDetails?.id)
//       .subscribe((network) => {
//         Object.assign(this.network, network);
//       });
//   }

//   async recieveRefreshCommand($event: any) {
//     // alert("recieveRefreshCommand")
//     this.message = $event;
//     // alert($event);
//     await this.delay(1500);
//     if (this.message == '1') {
//       // alert("ngOnInit")
//       this.child?.ngOnInit();
//     }
//   }

//   async delay(ms: number) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   goToProfile() {
//     this.router
//       .navigate(['/users/' + this.userDetails?.id?.toString()])
//       .then(() => {
//         location.reload();
//       });
//   }

//   goToOtherProfile(user: Utilisateur) {
//     this.router.navigate(['/users/' + user.id?.toString()]).then(() => {
//       location.reload();
//     });
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

//   displayUserPhoto(user: Utilisateur): any {
//     if (user.photoProfile) {
//       if (user.photoProfile.type === 'image/png')
//         return this.domSanitizer.bypassSecurityTrustUrl(
//           'data:image/png;base64,' + user.photoProfile.bytes
//         );
//       else if (user.photoProfile.type === 'image/jpeg')
//         return this.domSanitizer.bypassSecurityTrustUrl(
//           'data:image/jpeg;base64,' + user.photoProfile.bytes
//         );
//     }
//     return null;
//   }
// }
