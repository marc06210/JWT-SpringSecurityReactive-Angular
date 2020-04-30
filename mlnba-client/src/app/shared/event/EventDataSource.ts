import { Event } from './event';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { EventService } from './event.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class EventDataSource implements DataSource<Event> {

    private eventsSubject = new BehaviorSubject<Event[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private service: EventService) {}

    connect(collectionViewer: CollectionViewer): Observable<Event[]> {
        return this.eventsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.eventsSubject.complete();
        this.loadingSubject.complete();
    }

    loadEvents() {
        this.loadingSubject.next(true);
        this.service.getAll().subscribe(
                events => this.eventsSubject.next(events)
            );
    }    
}