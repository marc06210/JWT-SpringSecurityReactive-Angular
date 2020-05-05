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

  get(id:string): Observable<Member> {
    return this.http.get<Member>('/api/member/'+id);
  }

  me(): Observable<Member> {
    return this.http.get<Member>('/api/me');
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', credentials);
  }

  save(member: Member): Observable<any> {
    if(member.id) {
      return this.http.put('/api/member/'+member.id, member);
    } else {
      return this.http.post('/api/member', member);
    }
  }

  delete(id:string): Observable<Member> {
    return this.http.delete<Member>('/api/member/'+id);
  }
}
