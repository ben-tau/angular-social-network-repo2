import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class WallCreatePostComponent implements OnInit {
  @Input() userDetails!: any;
  @Input() currentUser!: User;
  constructor(
    private postsService: PostsService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  createPostForm = this.fb.group({
    contenu: ['', Validators.required],
    visibilite: ['', Validators.required],
    publicationImageUrl: [''],
  });

  get contenu() {
    return this.createPostForm.get('contenu');
  }
  get visibilite() {
    return this.createPostForm.get('visibilite');
  }
  get publicationImageUrl() {
    return this.createPostForm.get('publicationImageUrl');
  }

  addPost() {
    const controls = this.createPostForm.controls;
    console.log('contenu ' + controls.contenu.value);
    console.log('visibilite ' + controls.visibilite.value);

    this.postsService
      .createPost(
        this.contenu?.value,
        this.visibilite?.value,
        this.publicationImageUrl?.value,
        this.userDetails.id
      )
      .subscribe((data) => {
        this.postsService.asObservable().next(data);
      });
  }
}
