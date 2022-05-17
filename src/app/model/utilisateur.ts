import { Role } from './role';
import { Photo } from './photo';

export class Utilisateur {
  id: number | undefined;
  nom: string | undefined;
  prenom: string | undefined;
  nomUtilisateur: string | undefined;
  motDePasse: string | undefined;
  confirmerMotDePasse: string | undefined;
  roles: Array<Role> = new Array<Role>();
  numeroTelephone: string | undefined;
  ville: string | undefined;
  photoProfile: Photo | undefined;
  // currentJob: string;
  // currentCompany: string;
  // usersFollowing: Array<Connection> = new Array<Connection>();
  // userFollowedBy: Array<Connection> = new Array<Connection>();
  // numOfConnections: number;
  // education: Array<SkillsAndExperience> = new Array<SkillsAndExperience>();
  // workExperience: Array<SkillsAndExperience> = new Array<SkillsAndExperience>();
  // skills: Array<SkillsAndExperience> = new Array<SkillsAndExperience>();
  // website: string;
  // twitter: string;
  // github: string;
  // chats: Array<Chat> = new Array<Chat>();
}
