import { Team } from '../team/team';

export class Event {
  id: string;
  title: string;
  description: string;
  opponent: string;
}
export class Match {
  id: string;
  date: string;
  time: string;
  place: string;
  localTeam: Team = new Team();
  opponent: string;
}