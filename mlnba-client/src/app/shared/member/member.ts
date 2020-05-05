export class Member {
    id: string;
    username: string;
    authorities: RoleData[];
}

export interface RoleData {
    authority: string;
  }