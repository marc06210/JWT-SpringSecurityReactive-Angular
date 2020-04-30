import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { Slide } from '../carousel/carousel.interface';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tiles: Tile[] = [
    {cols: 2, rows: 1, color: 'lightblue'},
    {cols: 1, rows: 1, color: ''},
    {cols: 1, rows: 1, color: 'lightpink'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  
}
