import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, Subject, throwError } from 'rxjs';
import { Post } from '../model/post';


@Injectable({
  providedIn: 'root'
})
export class PostsService{

  private postsUrl = 'http://localhost:8080/api/v0/utilisateurs/'
  private subject:Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  getPosts(userId:number, token:string) : Observable<Post[]>{

    const options = {
      headers: new HttpHeaders({'Authorization':token}),
    }
    return this.http.get<Post[]>(this.postsUrl + userId +'/mur-publications',options
    )
    .pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
      console.log(error)
      return throwError(() => error)
    }))
  }

  createPost(contenu:string,visibilite:boolean,utilisateurId:number) : Observable<Post>{
    const post = {
      contenu,
      isVisible:visibilite
    }
    console.log("post object", post);

    return this.http.post<any>(this.postsUrl + `${utilisateurId}/mur/nouvelle-publication`,post)
  }

  editPost(id:string | number, post:Post): Observable<any>{
    return this.http.put(this.postsUrl + id, post)
  }

  deletePost(id: string | number):Observable<any>{
    return this.http.delete(this.postsUrl + id)
  }

  getPost(id:number): Observable<Post>{
    return this.http.get<Post>(this.postsUrl + id)
  }

  asObservable(): Subject<any>{
    return this.subject;
  }

  getVisiblesPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl + 'mur-publications/visible')
    .pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
      console.log(error)
      return throwError(() => error)
    }))
  }
}

