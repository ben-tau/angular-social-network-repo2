import { Connection } from './connection';
import { Role } from './role';

export class User {
  id: number | undefined;
  nomUtilisateur: string | undefined;
  email: string | undefined;
  motDePasse: string | undefined;
  motDePasseConf: string | undefined;
  profilPhoto: string | undefined;
  profileStatus: boolean | undefined;
  currentJob: string | undefined;
  roles: Array<Role> = new Array<Role>();
  reseau!: Connection[];
  destinataires: Array<Connection> = new Array<Connection>();
  expediteurs: Array<Connection> = new Array<Connection>();
}
