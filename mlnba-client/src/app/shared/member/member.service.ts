import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('/api/member');
  }

  me(): Observable<Member> {
    return this.http.get<Member>('/api/me');
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', credentials);
  }
}
