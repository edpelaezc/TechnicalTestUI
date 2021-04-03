import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ContactsEditComponent implements OnInit {

  constructor(private fb: FormBuilder, private api: ContactsService, private _ActivatedRoute: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      birthDate: [''],
      phoneNumber: ['', [Validators.required]],      
      types: ['', [Validators.required]]
    });
  }
  
  contact: any;
  form: FormGroup;
  contactTypes:any;

  ngOnInit(): void {      
    // getting the user
    this.getContact();
    console.log(this.contact);     
    console.log(this.contactTypes);
    
  }

  getContact() {
    let Id = parseInt(this._ActivatedRoute.snapshot.paramMap.get("id"));
    this.api.getContact(Id).subscribe(res => {
      if (res.err) {
        alert('not found');
      }
      else {              
        this.contact = res;
      }
    });
  }

}
