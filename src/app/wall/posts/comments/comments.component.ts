import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Formatters } from 'src/app/helpers/formatters';
import { User } from 'src/app/model/user';
import { UserDetails } from 'src/app/model/user-details';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/utilisateur.service';
import { Comment } from '../../../model/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  currentUser!: User;
  userDetails!: any;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  @Input() comments!: any[];
  @Input() publicationId!: number;

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (userDetails) => {
        this.userDetails = userDetails;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.reworkDates();
    this.userService.getUser(this.userDetails?.id).subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  reworkDates() {
    this.comments.map((comment) => {
      let timestamp = +comment.datePublication;

      return Formatters.dateToString(timestamp, comment, 'datePublication');
    });
  }
}
