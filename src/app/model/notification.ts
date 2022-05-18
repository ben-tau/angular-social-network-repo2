import { Connection } from './connection';
import { User } from './user';
import { Comment } from './comment';

export class Notification {
  id: number | undefined;
  isShown: boolean | undefined;
  typeNotification: string | undefined;
  auteur: User | undefined;
  demandeConnection: Connection | undefined;
  nouveauCommentaire: Comment | undefined;
}
