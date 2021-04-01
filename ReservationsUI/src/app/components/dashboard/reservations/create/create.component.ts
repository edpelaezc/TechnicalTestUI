import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from "ngx-editor";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy  {

  editor: Editor;
  html: '';

  constructor() {    
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
