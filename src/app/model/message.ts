import { Chat } from './chat';
import { Utilisateur } from './utilisateur';

export class Message {
  id: number | undefined;
  content: String | undefined;
  timestamp: Date | undefined;
  chat: Chat | undefined;
  userMadeBy: Utilisateur | undefined;
}
