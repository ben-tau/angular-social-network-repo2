import { Utilisateur } from './utilisateur';
import { Message } from './message';

export class Chat {
  id: number | undefined;
  timestamp: Date | undefined;
  users: Array<Utilisateur> = new Array<Utilisateur>();
  messages: Array<Message> = new Array<Message>();
  latestMessage: Message | undefined;
}
