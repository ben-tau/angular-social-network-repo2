import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Publication } from '../model/publication';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsUrl = 'http://localhost:8080/api/v0/utilisateurs/'

  constructor(private http:HttpClient) { }

  createDb() {
    return{
      heroes: [
        {
          id: 1,
          name : 'Spiderman',
          team : 'avengers'
        }
      ]
    }
  }

  getComments(userId:number, token:string) : Observable<Publication[]>{

    return this.http.get<Publication[]>(this.commentsUrl + userId +'/mur-publications'
    )
    .pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
      console.log(error)
      return throwError(() => error)
    }))
  }

  createComment(/*contenu:string,publicationId:number,utilisateurId:number*/obj:any) : Observable<Publication>{
    const comment = {
      contenu:obj.contenu
    }

    return this.http.put<any>(this.commentsUrl + `${obj.utilisateurId}/mur/nouveau-commentaire/${obj.publicationId}`,comment)
  }
    // console.log("comment object", comment);

    // return this.http.post<any>(this.commentsUrl + `${utilisateurId}/mur/nouvelle-publication`,comment)
  // }

  editComments(id:string | number, comment:Comment): Observable<any>{
    return this.http.put(this.commentsUrl + id, comment)
  }

  deleteComments(id: string | number):Observable<any>{
    return this.http.delete(this.commentsUrl + id)
  }

  getComment(id:number): Observable<Publication>{
    return this.http.get<Publication>(this.commentsUrl + id)
  }
}
