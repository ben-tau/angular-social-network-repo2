import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { UserDetails } from '../model/user-details';
import { AuthenticationService } from '../services/authentication.service';
import { NetworkService } from '../services/reseau.service';
import { UserService } from '../services/utilisateur.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit {
  startPage: number | undefined;
  paginationLimit: number | undefined;
  userDetails: UserDetails | undefined | null;
  network: User[] = new Array<User>();
  appUsers: User[] = new Array<User>();
  currentUser: User = new User();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private networkService: NetworkService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authenticationService.getLoggedInUser().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });

    this.userService.getUser(this.userDetails?.id?.toString()).subscribe({
      next: (user1: User) => {
        Object.assign(this.currentUser, user1);
      },
      error: (error: { message: any }) => {
        alert(error.message);
      },
    });

    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        Object.assign(this.appUsers, users);
      },
      error: (error: { message: any }) => {
        alert(error.message);
      },
    });

    this.networkService
      .getNetwork(this.userDetails?.id)
      .subscribe((network) => {
        Object.assign(this.network, network);
      });

    this.startPage = 0;
    this.paginationLimit = 8;

    this.reworkAppUsersBeforeDisplay()
  }

  reworkAppUsersBeforeDisplay(){
    let newArr = this.appUsers.map(user=>{
      console.log("id",this.currentUser.id);

      if(user.id == this.currentUser.id){
        console.log("ici");

        return;
      }
      return user
    })
    console.log(newArr);

    console.log(this.appUsers);
  }

  addConnection(user: User) {
    this.networkService
      .addNewConnection(this.userDetails?.id, user?.id)
      .subscribe({
        next: (responce) => {},
        error: (error) => {
          alert(error.message);
        },
      });

    this.networkService
      .getNetwork(this.userDetails?.id)
      .subscribe((network) => {
        Object.assign(this.network, network);
      });

    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  // goToProfile(user: User) {
  //   this.router.navigate(['/users/' + user.id?.toString()]).then(() => {
  //     location.reload();
  //   });
  // }

  connected(id: number | undefined): boolean {
    for (let u of this.network) {
      if (u.id == id) return true;
    }
    return false;
  }

  hasRequestPending(id: number | undefined): boolean {
    let flag = false;

    this.currentUser.destinataires.forEach((con: any) => {
      if (con.utilisateurDestinataire.id == id && !con.isAccepted) flag = true;
    });

    this.currentUser.expediteurs.forEach((con: any) => {
      if (con.utilisateurExpediteur.id == id && !con.isAccepted) flag = true;
    });

    return flag;
  }

  showMoreItems() {
    this.paginationLimit = Number(this.paginationLimit) + 4;
  }
}
