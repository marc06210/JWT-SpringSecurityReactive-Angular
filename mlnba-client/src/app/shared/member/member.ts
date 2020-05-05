export class Member {
    id: string;
    username: string;
    lastname: string;
    firstname: string;
    password: string;
    roles: RoleData[];
}

export interface RoleData {
    authority: string;
  }