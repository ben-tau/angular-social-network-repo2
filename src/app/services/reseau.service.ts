import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private host: string = 'http://localhost:8080/api/v0/utilisateurs';

  constructor(private http: HttpClient) {}

  addNewConnection(
    userId: number | undefined | null,
    connId: number | undefined
  ): Observable<string> {
    return this.http.put<any>(
      `${
        this.host
      }/${userId?.toString()}/demande-nouvelle-connection/${connId?.toString()}`,
      { observe: 'response' }
    );
  }

  getNetwork(userId: number | undefined | null): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/${userId?.toString()}/reseau`);
  }

  hasSendRequest(mainUserId: number, otherUserId: number): Observable<boolean> {
    return this.http.get<any>(
      `${this.host}/${mainUserId.toString()}/demande/${otherUserId.toString()}`
    );
  }
}
