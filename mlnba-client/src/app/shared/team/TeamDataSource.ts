import { Team } from './team';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { TeamService } from './team.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class TeamDataSource implements DataSource<Team> {

    private lessonsSubject = new BehaviorSubject<Team[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private teamService: TeamService) {}

    connect(collectionViewer: CollectionViewer): Observable<Team[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    loadTeams() {

        this.loadingSubject.next(true);

        this.teamService.getAll()
        .subscribe(teams => this.lessonsSubject.next(teams));
    }    
}