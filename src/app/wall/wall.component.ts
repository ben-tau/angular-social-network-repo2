import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/utilisateur.service';
import { User } from '../model/user';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit {
  userDetails!: any;
  currentUser!: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private postsService: PostsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authenticationService.getLoggedInUser().subscribe((userDetails) => {
      if (!userDetails) {
        this.router.navigate(['/login']);
      }
    });
    this.getStorage();
    this.userService.getUser(this.userDetails.id).subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log(user);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
