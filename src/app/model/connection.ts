import { User } from './user';

export class Connection {
  id!: number;
  // nomUtilisateur!: string;
  // email!:string
  // notifications!:any[];
  utilisateurExpediteur!: User;
  utilisateurDestinataire!: User;
}
