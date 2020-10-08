import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match, News } from './event';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

    URL: string = "/api/news";

  constructor(private http: HttpClient) {
  }

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.URL);
  }

  save(news: News): Observable<News> {
    if(news.id) {
      return this.http.put<News>(this.URL+'/'+news.id, news);
    } else {
      return this.http.post<News>(this.URL, news);
    }
  }

  delete(id: string) {
    return this.http.delete<News>(this.URL+id);
  }
}
