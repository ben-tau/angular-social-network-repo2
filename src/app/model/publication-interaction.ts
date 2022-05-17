import { Publication } from './publication';
import { Utilisateur } from './utilisateur';

export class PublicationInteraction {
  id: number | undefined;
  userMadeBy: Utilisateur | undefined;
  post: Publication | undefined;
}
