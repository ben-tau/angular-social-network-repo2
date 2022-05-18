import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
=======
import { UserDetails } from '../model/user-details';
>>>>>>> 93a5a910af75f073332b8498bee00c90b492c66b
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
<<<<<<< HEAD
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
=======
  notificationsSize! : number
  userDetails: UserDetails | null | undefined;
>>>>>>> 93a5a910af75f073332b8498bee00c90b492c66b

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notifServ: NotificationService
  ) {}

  ngOnInit(): void {
    this.authenticationService.getLoggedInUser().subscribe(userDetails => {
        this.userDetails = userDetails
      }
    )
    this.getNumberOfNotif()
  }

  logOut() {
    this.authenticationService.logout();
  }

  getNumberOfNotif(){
    this.notifServ.getNotifications(this.userDetails?.id).subscribe(items=>{
      this.notificationsSize = items.length
    })
  }
}
