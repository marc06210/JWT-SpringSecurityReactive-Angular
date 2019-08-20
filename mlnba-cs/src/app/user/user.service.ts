import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from "rxjs/operators";

import { User } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http:HttpClient) {}

    private userUrl = '/api/member';

    public getUsers() {
      return this.http.get<User[]>(this.userUrl);
      //.pipe(
      //  map(res =>  res["payload"])
      //);
    }

    public getUser(id: string) {
      return this.http.get<User[]>(this.userUrl + "/" + id);
    }

    public deleteUser(user: User) {
      return this.http.delete(this.userUrl + "/" + user.id);
    }

    public createUser(user: User) {
      return this.http.post<User>(this.userUrl, user);
    }

    public updateUser(user: User) {
      return this.http.put<User>(this.userUrl + "/" + user.id, user);
    }

}