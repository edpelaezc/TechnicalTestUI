import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ContactsListComponent implements OnInit {

  constructor() { }
  contacts:any = [];

  ngOnInit(): void {
  }

  edit(id:string) {}

}
