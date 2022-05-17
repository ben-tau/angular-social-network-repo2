import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Publication } from '../model/publication';
// import { Commentaire } from '../model/commentaire';
// import { PublicationInteraction } from '../model/publication-interaction';
import { Utilisateur } from '../model/utilisateur';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ReseauService {
  private host: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  addNewConnection(userId: number, connId: number): Observable<string> {
    return this.http.put<string>(
      `${this.host}/${userId.toString()}/new-connection/${connId.toString()}`,
      { observe: 'response' }
    );
  }

  getNetwork(userId: number | undefined | null): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(
      `${this.host}/${userId?.toString()}/network`
    );
  }

  search(userId: number, searchQuery: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(
      `${this.host}/${userId.toString()}/search/${searchQuery}`
    );
  }

  hasSendRequest(mainUserId: number, otherUserId: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.host}/${mainUserId.toString()}/request/${otherUserId.toString()}`
    );
  }
}
