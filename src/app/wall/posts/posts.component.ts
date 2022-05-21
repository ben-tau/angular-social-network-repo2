import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../model/post';
import { Formatters } from 'src/app/helpers/formatters';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/utilisateur.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-wall-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class WallPostsComponent implements OnInit {
  posts!: Post[];
  // comments!: Comment[];
  loading: boolean = false;
  showComments: boolean = false;
  @Input() userDetails!: any;
  @Input() currentUser!: User;
  allTextIsDisplayed:boolean = false;

  private subscriptions: Array<Subscription>;
  tempPublicationId!: number;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private commentsService: CommentsService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.getPosts();
    this.subscriptions.push(
      this.postsService.asObservable().subscribe(() => {
        this.getPosts();
      })
    );

    console.log(this.currentUser);

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
    this.postsService
      .getPosts(this.userDetails.id)
      .subscribe((posts: Post[]) => {
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
        this.loading = false;
      });
  }

  giveIdForComment(id: number) {
    this.tempPublicationId = id;
  }

  addComment() {
    const controls = this.createCommentForm.controls;

    let obj = {
      contenu: controls.contenu?.value,
      utilisateurId: this.userDetails.id,
      publicationId: this.tempPublicationId,
    };

    this.commentsService.createComment(obj).subscribe((data) => {
      this.postsService.asObservable().next(data);
    });

    this.displayComments();
  }

  displayAllContent(){
    this.allTextIsDisplayed = !this.allTextIsDisplayed
  }
}
