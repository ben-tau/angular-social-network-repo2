import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class WallCreatePostComponent implements OnInit {
  @Input() userDetails!: any;

  constructor(private postsService: PostsService, private fb: FormBuilder) {}

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
