import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publication } from '../model/publication';
// import { Commentaire } from '../model/commentaire';
import { PublicationInteraction } from '../model/publication-interaction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MurPublicationService {
  private host: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  addPost(
    formWrapper: FormData,
    userId: number
  ): Observable<HttpResponse<string>> {
    return this.http.post<string>(
      `${this.host}/${userId.toString()}/feed/new-post`,
      formWrapper,
      { observe: 'response' }
    );
  }

  getFeedPosts(userId: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(
      `${this.host}/${userId.toString()}/feed-posts`
    );
  }

  getRecommendedPosts(userId: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(
      `${this.host}/${userId.toString()}/recommended-posts`
    );
  }

  addPostReaction(
    postId: number,
    userId: number
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      `${
        this.host
      }/${userId.toString()}/feed/post-interested/${postId.toString()}`,
      { observe: 'response' }
    );
  }

  addNewComment(
    userId: number,
    postId: number,
    comment: Comment
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      `${this.host}/${userId.toString()}/feed/new-comment/${postId.toString()}`,
      comment,
      { observe: 'response' }
    );
  }

  userIsInterested(
    userId: number,
    postId: number
  ): Observable<HttpResponse<PublicationInteraction>> {
    return this.http.get<PublicationInteraction>(
      `${
        this.host
      }/${userId.toString()}/feed/is-interested/${postId.toString()}`,
      { observe: 'response' }
    );
  }
}
