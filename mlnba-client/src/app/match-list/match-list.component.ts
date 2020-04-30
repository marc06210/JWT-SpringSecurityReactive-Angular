import { Component, OnInit } from '@angular/core';
import { EventDataSource } from '../shared/event/EventDataSource';
import { EventService } from '../shared/event/event.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'opponent'];
  dataSource: EventDataSource;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.loadMatches();
  }

  loadMatches() {
    this.dataSource = new EventDataSource(this.eventService);
    this.dataSource.loadEvents();
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
}
