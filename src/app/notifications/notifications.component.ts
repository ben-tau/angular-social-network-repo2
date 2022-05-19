import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { UserDetails } from '../model/user-details';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../model/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  userDetails: UserDetails | undefined | null;
  notifications: Notification[] = new Array<Notification>();
  connRequests: Notification[] = new Array<Notification>();
  postNotifications: Notification[] = new Array<Notification>();
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.authenticationService.getLoggedInUser().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });

    this.notificationService
      .getNotifications(this.userDetails?.id)
      .subscribe((notifications) => {
        Object.assign(this.notifications, notifications);
        this.notifications.forEach((notif) => {
          if (notif.typeNotification === 'DEMANDE_CONNECTION') {
            this.connRequests.push(notif);
          } else if (notif.typeNotification === 'COMMENTAIRE') {
            this.postNotifications.push(notif);
          }
        });
        this.loading = false;
      });
    console.log('Connection Notifications: ', this.connRequests);

    console.log('Post Notifications: ', this.postNotifications);
  }

  getType(type: string | undefined): Number {
    // alert(type);
    if (type === 'DEMANDE_CONNECTION') return 0;
    else if (type === 'COMMENTAIRE') return 1;
    else return 2;
  }

  filterNotifications() {
    this.notifications.forEach((notif) => {
      if (notif.typeNotification === 'DEMANDE_CONNECTION') {
        this.connRequests.push(notif);
      } else if (notif.typeNotification === 'COMMENTAIRE') {
        this.postNotifications.push(notif);
      }
    });
  }

  acceptConnection(conId: number | undefined) {
    this.notificationService
      .acceptConnection(this.userDetails?.id, conId!)
      .subscribe({
        next: (responce) => {},
        error: (error) => {
          alert(error.message);
        },
      });
    location.reload();
  }

  goToProfile(user: User | undefined) {
    this.router.navigate(['/users/' + user?.id?.toString()]).then(() => {
      location.reload();
    });
  }
}
