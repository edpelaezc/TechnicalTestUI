import { formatDate } from '@angular/common';
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

  form: FormGroup;
  today: string;
  contactTypes: any;

  ngOnInit(): void {
    // set the date max value
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    // getting the user and filling the form with saved values
    let Id = parseInt(this._ActivatedRoute.snapshot.paramMap.get("id"));
    this.api.getContact(Id).subscribe(res => {
      if (res.err) {
        alert('not found');
      }
      else {
        this.contactTypes = JSON.parse(res.types);        

        this.form.patchValue({
          id: res.id,
          contactName: res.contactName,
          birthDate: formatDate(res.birthDate, 'yyyy-MM-dd', 'en-US'),
          phoneNumber: res.phoneNumber,
          types: this.contactTypes[0].Id
        })
      }
    });

  }

  submit() {
    // check form status 
    if (this.form.status == "VALID") {        
      // create json 
      let contact = {   
        id: this.form.controls.id.value.toString(),     
        ContactName: this.form.controls.contactName.value,
        BirthDate: this.form.controls.birthDate.value,
        ContactTypeId: this.form.controls.types.value.toString(),
        PhoneNumber: this.form.controls.phoneNumber.value
      }

      console.log(contact);
      
      // using PUT to update the elemet
      this.api.putContact(contact, contact.id).subscribe(
        data => {  },
        err => { console.log(err) }
      );

      // to refresh data table date
      alert('Sucessfully updated')
      this.router.navigateByUrl('contacts/list');
    }
    else {
      alert('Incorrect or missing values!');
    }
  }
}
