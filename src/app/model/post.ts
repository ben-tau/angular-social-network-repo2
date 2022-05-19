import { Comment } from '../model/comment';

export interface Post {
  id: number;
  version: number;
  contenu: string;
  datePublication: string | number;
  publicationImageUrl: string | undefined;
  visibilite: boolean;
  likes: number;
  auteur: any;
  commentaires: Comment[];
}
