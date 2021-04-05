import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../../../../services/contacts/contacts.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ContactsListComponent implements OnInit {

  constructor(private api: ContactsService, private router: Router) { }
  contacts:any = [];

  ngOnInit(): void {
    this.getContacts();
  }

  edit(id:string) {}

  getContacts() {
    this.api.getContactsList().subscribe(res => {
      if (res.error) {
        alert('error');
      }
      else {
        for (let index = 0; index < res.length; index++) {          
          this.contacts.push(res[index]);
        }
      }
    });
  }

  remove(id: string) {
    this.api.deleteContact(id).subscribe( res => {
      if (res.error) {
        alert('error');
      } 
      else {
        alert('Deleted contact');
        this.contacts = [];
        this.getContacts();
      }
    }
    );    
  }

}
