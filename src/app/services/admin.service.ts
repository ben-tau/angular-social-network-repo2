import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { UserDetails } from '../model/user-details';
import { Login } from '../model/login';
import { User } from '../model/user';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
// };

@Injectable({ providedIn: 'root' })
export class AdminService {
  private host: string = 'http://localhost:8080/api/v0/administrateur';

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(`${this.host}/utilisateurs`, {
      observe: 'response',
    });
  }

  deleteUser(user: User): Observable<HttpResponse<any>> {
    return this.http.delete<any>(
      `${this.host}/utilisateurs/supprimer/${user.id}`,
      {
        observe: 'response',
      }
    );
  }

  updateProfileStatus(
    user: User,
    profileStatus: any
  ): Observable<HttpResponse<any>> {
    return this.http.patch<any>(
      `${this.host}/utilisateurs/profil-status/${user.id}`,
      profileStatus,
      { observe: 'response' }
    );
  }

  isAdmin(user: User) {
    for (let role of user.roles) {
      if (role.nom == 'ADMINISTRATEUR') return true;
    }
    return false;
  }
}
