import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Formatters } from 'src/app/helpers/formatters';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from '../../../model/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  constructor() {
  }

  @Input() comments!: any[];
  @Input() publicationId! :number

  ngOnInit(): void {
    this.reworkDates();
  }

  reworkDates() {
    this.comments.map((comment) => {
      let timestamp = +comment.datePublication;

      return Formatters.dateToString(timestamp, comment, 'datePublication');
    });
  }




}
