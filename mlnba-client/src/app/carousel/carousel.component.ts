import { Component, Input } from '@angular/core';
import { Slide } from './carousel.interface';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from './carousel.animations';
import { Subscription, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(fadeIn, {params: { time: '1300ms' }} )]),
      transition("* => void", [useAnimation(fadeOut, {params: { time: '1300ms' }} )]),
    ])
  ]
})
export class CarouselComponent {
  @Input() slides: Slide[];
  @Input() showButton: boolean = false;
  @Input() timer: number = 10000;

  currentSlide = 0;

  constructor() { }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  private subscription: Subscription;


  ngOnInit() {
    this.sub();
  }

  sub() {
    const source = timer(this.timer, this.timer);
    this.subscription = source.subscribe(val => this.onNextClick());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
