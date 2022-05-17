import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private connectionsUrl = 'http://localhost:8080/api/v0/utilisateurs/'

  constructor(private http: HttpClient) { }

  getConnections(userId:number, token:string) : Observable<User[]>{

    return this.http.get<User[]>(this.connectionsUrl + userId +'/reseau'
    )
    // .pipe(data => {
    //   data.forEach((item)=>{
    //     console.log(item);

    //   })
    // })
    .pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
      console.log(error)
      return throwError(() => error)
    }))
  }

  // createConnection(contenu:string,visibilite:boolean,utilisateurId:number,token:string) : Observable<Connection>{
  //   const connection = {
  //     contenu
  //     //visibilite
  //   }
  //   console.log("connection object", connection);

  //   return this.http.connection<any>(this.connectionsUrl + `${utilisateurId}/mur/nouvelle-publication`,connection)
  // }

  // editConnection(id:string | number, connection:Connection): Observable<any>{
  //   return this.http.put(this.connectionsUrl + id, connection)
  // }

  // deleteConnection(id: string | number):Observable<any>{
  //   return this.http.delete(this.connectionsUrl + id)
  // }

  // getConnection(id:number): Observable<Connection>{
  //   return this.http.get<Connection>(this.connectionsUrl + id)
  // }
}
