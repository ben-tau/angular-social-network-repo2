// à refactoriser pour plus tard (intégrér le plusage '+')

import { User } from '../model/user';
import { UserDetails } from '../model/user-details';

export class Formatters {
  static dateToString(timestamp: number, obj: any, dateProp: string) {
    timestamp = obj[dateProp];

    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();
    var seconds = '0' + date.getSeconds();
    var formattedTime =
      hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    obj[dateProp] =
      'le ' + date.toLocaleDateString('fr-FR') + ' à ' + formattedTime;

    return obj;
  }

  static makeRedirectUrl(userDetails: UserDetails): string {
    let redirectUrl: string | null = null;
    if (!userDetails.isActif) redirectUrl = '/suspended';
    else if (this.hasRole('ADMINISTRATEUR', userDetails))
      redirectUrl = '/admin';
    else if (
      this.hasRole('ENTREPRISE', userDetails) ||
      this.hasRole('UTILISATEUR', userDetails)
    )
      redirectUrl = '/feed';
    else redirectUrl = '/login';
    return redirectUrl;
  }

  static hasRole(rolename: string, userDetails: UserDetails): boolean {
    let r = false;
    if (userDetails) {
      userDetails.roles.forEach((role: string | undefined) => {
        if (role === rolename) r = true;
      });
    }
    return r;
  }

  static createUserDetails(user: User | null | undefined, response: any) {
    const userDetails = new UserDetails();
    user = response.body;
    userDetails.token = response.headers.get('Authorization');
    userDetails.id = user?.id;
    user?.roles.forEach((role: { nom: string | undefined }) => {
      userDetails.roles.push(role.nom);
    });
    userDetails.isActif = user?.profileStatus;
    return userDetails;
  }
}
