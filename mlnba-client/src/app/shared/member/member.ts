export class Member {
    username: string;
    authorities: RoleData[];
  }

export interface RoleData {
    authority: string;
  }