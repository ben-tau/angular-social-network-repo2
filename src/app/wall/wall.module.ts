import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WallAsideComponent } from './aside/aside.component';
import { WallCreatePostComponent } from './create-post/create-post.component';
import { WallPostsComponent } from './posts/posts.component';
import { WallComponent } from './wall.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { CommentsComponent } from './posts/comments/comments.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    WallAsideComponent,
    WallCreatePostComponent,
    WallPostsComponent,
    WallComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatRadioModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    WallAsideComponent,
    NavbarComponent,
  ],
})
export class WallModule {}
