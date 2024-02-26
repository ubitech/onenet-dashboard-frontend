export class User {

  id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  fullname: string;
  email: string;
  avatar: string;
  roles: string[];
  createdTimestamp: Date;
  realmRoles: string[];
  isAuthenticated: boolean;
  preferences?: any;
  timezone?: string;
  dateFormat?: string;
}
