import { Utilisateur } from './utilisateur';

export class Role {
  nom: string | undefined;
  utilisateurs: Array<Utilisateur> | undefined;
}
