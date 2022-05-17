import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Publication } from '../model/publication';
// import { Commentaire } from '../model/commentaire';
// import { InterestReaction } from '../model/interestReaction';
import { Chat } from '../model/chat';
import { Message } from '../model/message';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private host: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  newMessage(
    message: Message,
    userId: number,
    chatId: number
  ): Observable<HttpResponse<string>> {
    return this.http.post<string>(
      `${this.host}/${userId.toString()}/chat/${chatId.toString()}/new-message`,
      message,
      { observe: 'response' }
    );
  }

  getChats(userId: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.host}/${userId.toString()}/chats`);
  }
}
