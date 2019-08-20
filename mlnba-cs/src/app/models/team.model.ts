import { User } from './user.model';
export class Team {
    id: string;
    name: string;
    season: string;
    description: string;
    members: User[];
  }