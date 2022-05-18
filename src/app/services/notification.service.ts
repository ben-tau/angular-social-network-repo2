import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private host: string = 'http://localhost:8080/api/v0/utilisateurs';

  constructor(private http: HttpClient) {}

  acceptConnection(
    userId: number | undefined | null,
    connId: number
  ): Observable<string> {
    return this.http.put<any>(
      `${
        this.host
      }/${userId?.toString()}/notifications/${connId.toString()}/accepter-connection`,
      { observe: 'response' }
    );
  }

  getNotifications(
    userId: number | undefined | null
  ): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${this.host}/${userId?.toString()}/notifications`
    );
  }
}
