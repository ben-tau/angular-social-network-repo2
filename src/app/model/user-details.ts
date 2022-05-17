export class UserDetails {
  id: number | null | undefined;
  token: string | null | undefined;
  isActif: boolean | undefined;
  roles: Array<string | undefined> = new Array<string | undefined>();

  hasRole(nomrole: string): boolean {
    let r = false;
    this.roles.forEach((role) => {
      if (role === nomrole) r = true;
    });
    return r;
  }
}
