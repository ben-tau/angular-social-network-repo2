import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formatters } from '../helpers/formatters';
import { User } from '../model/user';
import { AdminService } from '../services/admin.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users: User[] | null = new Array<User>();
  paginationLimit: number = 0;
  startPage: number = 0;
  constructor(
    private authenticationService: AuthenticationService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.getLoggedInUser().subscribe((userDetails) => {
      if (!userDetails) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate([Formatters.makeRedirectUrl(userDetails)]);
      }
    });
    this.getUsers();
    this.paginationLimit = 12;
  }

  showMoreItems() {
    this.paginationLimit = Number(this.paginationLimit) + 4;
  }

  getUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        console.log(users);
        this.users = users.body;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isAdmin(user: User) {
    return this.adminService.isAdmin(user);
  }

  deleteProfile(user: User) {
    this.adminService.deleteUser(user).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  activateProfile(user: User) {
    this.adminService
      .updateProfileStatus(user, { profilEstActif: true })
      .subscribe({
        next: () => {
          this.getUsers();
        },

        error: (err) => {
          console.log(err);
        },
      });
  }

  suspendProfile(user: User) {
    this.adminService
      .updateProfileStatus(user, { profilEstActif: false })
      .subscribe({
        next: () => {
          this.getUsers();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  displayProfilePhoto(user: User) {}

  goToProfile(user: User) {
    // this.router.navigate(['/users/' + user.id?.toString()]).then(() => {
    //   location.reload();
    // });
  }
}
