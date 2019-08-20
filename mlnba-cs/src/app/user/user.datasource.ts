import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import {catchError, finalize} from "rxjs/operators";
import { UserService } from './user.service';

//import {of} from "rxjs/observable/of";

export class UserDataSource implements DataSource<User> {

    private teamSubject = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();


    constructor(private userService: UserService) {

    }

    loadUsers() {
        this.loadingSubject.next(true);

        this.userService.getUsers().pipe(
                catchError(() => ([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(users => {
                console.log("response " + users);
                this.teamSubject.next(users);
            }
            );

    }

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        console.log("Connecting data source");
        return this.teamSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.teamSubject.complete();
        this.loadingSubject.complete();
    }
}