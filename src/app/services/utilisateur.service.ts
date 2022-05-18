import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { ParametresUtilisateur } from '../model/parametres-utilisateur';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private host: string = 'http://localhost:8080/api/v0/utilisateurs';

  constructor(private http: HttpClient) {}

  getUser(id: number | undefined | null | string): Observable<any> {
    return this.http.get<any>(`${this.host}/${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.host}/`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  changePassword(
    usersettings: ParametresUtilisateur
  ): Observable<HttpResponse<any>> {
    return this.http.put<ParametresUtilisateur>(
      `${this.host}/${usersettings.id?.toString()}/settings/change-password/`,
      usersettings,
      { observe: 'response' }
    );
  }
}
