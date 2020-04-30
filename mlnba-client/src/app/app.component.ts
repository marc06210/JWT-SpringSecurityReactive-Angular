import { Component, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { Slide } from './carousel/carousel.interface';
import { CarouselComponent } from './carousel/carousel.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(CarouselComponent) carousel: CarouselComponent;
  
  title = 'titre';

  constructor(private app: AppService, private router: Router) {
  }

  logout() {
        this.app.user = null;
        this.app.token = null;
        this.router.navigateByUrl('/');
  }

  authenticated() {
    return (this.app.user!=null);
  }

  username(): string {
    return this.app.user.username;
  }

  admin(): boolean {
    return this.app.isAdmin();
  }

  
  slides: Slide[] = [
    {
      headline: "For Your Current Mood",
      src:
        "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
    },
    {
      headline: "Miouw",
      src:
        "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
    },
    {
      headline: "In The Wilderness",
      src:
        "https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80"
    },
    {
      headline: "Focus On The Writing",
      src:
        "https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
    }
  ];

}
