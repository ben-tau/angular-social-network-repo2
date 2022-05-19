import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from '../model/user-details';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  notificationsSize!: number;
  userDetails: UserDetails | null | undefined;
  loading!: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notifServ: NotificationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.authenticationService.getLoggedInUser().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
    this.getNumberOfNotif();
  }

  logOut() {
    this.authenticationService.logout();
  }

  getNumberOfNotif() {
    this.notifServ.getNotifications(this.userDetails?.id).subscribe((items) => {
      this.notificationsSize = items.length;
      this.loading = false;
    });
  }
}
