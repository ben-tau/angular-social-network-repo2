import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formatters } from '../helpers/formatters';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-suspended',
  templateUrl: './suspended.component.html',
  styleUrls: ['./suspended.component.scss'],
})
export class SuspendedComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
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
  }
}
