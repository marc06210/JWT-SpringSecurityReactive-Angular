import { Member } from './member';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MemberService } from './member.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class MemberDataSource implements DataSource<Member> {

    private membersSubject = new BehaviorSubject<Member[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private teamService: MemberService) {}

    connect(collectionViewer: CollectionViewer): Observable<Member[]> {
        return this.membersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.membersSubject.complete();
        this.loadingSubject.complete();
    }

    loadMembers(callback) {
        this.loadingSubject.next(true);

        this.teamService.getAll().subscribe(
            members => this.membersSubject.next(members),
            error => {
                if(callback) {
                    callback.unauthorized = true;
                }
            });
    }    
}