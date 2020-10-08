import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { NewsService } from 'src/app/shared/event/news.service';
import { News } from 'src/app/shared/event/event';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public message: string = "hello";
  public newsList: Array<News> = [];
  breakpoint: number = 3;  //to adjust to screen


  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Hello, world!</p>'
  };

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
    this.loadData();
  }

  onResize(event) { //to adjust to screen size
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }

  loadData() {
    this.newsService.getAllNews().subscribe(
      result => {
        this.newsList = result;
        console.log('number of news: ' + this.newsList.length);
      }
    );
  }

  saveContent() {
    console.log(this.model.editorData);
    this.message = this.model.editorData;
    let n : News = new News();
    n.content = this.model.editorData;
    this.newsService.save(n).subscribe(
      result => {this.loadData();}
    )
  }

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();

    console.log( data );
  }

  // images
  // https://ckeditor.com/docs/ckeditor5/latest/features/image-upload/easy-image.html
}
