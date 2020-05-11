import { Event, Match } from './event';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { EventService } from './event.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class EventDataSource implements DataSource<Match> {

    private eventsSubject = new BehaviorSubject<Match[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private service: EventService) {}

    connect(collectionViewer: CollectionViewer): Observable<Match[]> {
        return this.eventsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.eventsSubject.complete();
        this.loadingSubject.complete();
    }

    loadEvents() {
        this.loadingSubject.next(true);
        this.service.getAllMatches().subscribe(
                events => this.eventsSubject.next(events)
            );
    }    
}