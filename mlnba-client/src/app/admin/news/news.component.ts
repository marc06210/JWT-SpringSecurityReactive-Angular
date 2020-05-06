import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Hello, world!</p>'
  };

  constructor() { }

  ngOnInit(): void {
  }

  saveContent() {
    console.log(this.model.editorData);
  }

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();

    console.log( data );
  }

  // images
  // https://ckeditor.com/docs/ckeditor5/latest/features/image-upload/easy-image.html
}
