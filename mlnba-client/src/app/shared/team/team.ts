import { Member } from '../member/member';
import { Training } from './training';
export class Team {
    id: string;
    name: string;
    season: string;
    description: string;
    members: Member[];
    trainings: Training[] = [];
  }

export class TeamGroup {
  id: string;
  name: string;
  description: string;
  gender: string;

  teams: Team[];
}