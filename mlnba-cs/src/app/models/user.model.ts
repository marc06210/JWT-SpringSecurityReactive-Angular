export class User {
    id: string;
    username: string;
    password: string;
    lastname: string;
    firstname: string;

    roles: RoleData[];
  }

export interface RoleData {
    id: string;
    authority: string;
  }