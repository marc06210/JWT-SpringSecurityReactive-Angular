export class Member {
    id: string;
    username: string;
    lastname: string;
    firstname: string;
    password: string;
    roles: string[];
}

export interface RoleData {
    authority: string;
  }