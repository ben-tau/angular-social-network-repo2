import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../model/post';
import { Formatters } from 'src/app/helpers/formatters';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-wall-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class WallPostsComponent implements OnInit {
  posts!: Post[];
  // comments!: Comment[];
  showComments: boolean = false;
  @Input() userDetails!: any;
  private subscriptions: Array<Subscription>;
  tempPublicationId!: number;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private commentsService: CommentsService,
    private fb: FormBuilder
  ) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.getPosts();
    this.subscriptions.push(
      this.postsService.asObservable().subscribe(() => {
        this.getPosts();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }

  createCommentForm = this.fb.group({
    contenu: [null, Validators.required],
  });

  displayComments() {
    this.showComments = !this.showComments;
  }

  // getPosts() {
  //   this.postsService
  //     .getVisiblesPosts()
  //     .subscribe((posts) => {
  //       posts.sort((a, b) => {
  //         if (a.datePublication < b.datePublication) return 1;
  //         else if (a.datePublication > b.datePublication) return -1;
  //         else return 0;
  //       });

  //       posts.map((post) => {
  //         let timestamp = +post.datePublication;

  //         return Formatters.dateToString(timestamp, post, 'datePublication');
  //       });

  //       this.posts = posts;
  //     }
  //   );
  // }

  getPosts() {
    this.postsService.getPosts(this.userDetails.id).subscribe((posts:Post[]) => {
      posts.sort((a, b) => {
        if (a.datePublication < b.datePublication) return 1;
        else if (a.datePublication > b.datePublication) return -1;
        else return 0;
      });

      posts.map((post) => {
        let timestamp = +post.datePublication;

        return Formatters.dateToString(timestamp, post, 'datePublication');
      });

      this.posts = posts;
    });
  }

  giveIdForComment(id: number) {
    this.tempPublicationId = id;
    console.log('idforcomment', this.tempPublicationId);
  }

  addComment() {
    const controls = this.createCommentForm.controls;

    console.log(controls);

    console.log('addComment step1');

    console.log('contenu ' + controls.contenu.value);

    let obj = {
      contenu: controls.contenu?.value,
      utilisateurId: this.userDetails.id,
      publicationId: this.tempPublicationId,
    };

    console.log(obj);

    this.commentsService.createComment(obj).subscribe((data) => {
      this.postsService.asObservable().next(data);
    });

    this.displayComments();
  }
}
