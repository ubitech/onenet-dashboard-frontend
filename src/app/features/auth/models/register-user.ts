import { Role } from "../enums/role";

export class RegisterUser {


  constructor(
    private username: string,
    private password: string,
    private confirmPassword: string,
    private email: string,
    private realmRoles: Role[]
  ) {
  }
}
