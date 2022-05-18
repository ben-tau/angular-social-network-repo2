import { Post } from './post';

export class Comment {
  id: number | undefined;
  contenu!: string;
  datePublication!: number;
  auteur!: any;
  post!: Post | undefined;
}
