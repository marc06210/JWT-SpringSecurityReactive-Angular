import { Member } from '../member/member';
export class Team {
    id: string;
    name: string;
    season: string;
    description: string;
    members: Member[];
  }