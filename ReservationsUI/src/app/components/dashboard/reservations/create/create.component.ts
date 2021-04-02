import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from "../../../../services/reservations/reservations.service";
import { Editor } from "ngx-editor";
import { Router } from '@angular/router';
import $ from "jquery";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  editor: Editor;
  contactTypes: any = [];
  contacts: any = [];
  html: '';

  constructor(private fb: FormBuilder, private api: ReservationsService, private router: Router) {
    this.form = this.fb.group({
      ContactName: ['', [Validators.required]],
      ContactType: ['', [Validators.required]],
      Phone: [''],
      BirthDate: ['', [Validators.required]],
      editorContent: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getTypes();
    this.getContacts();    
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // gets the id and description of contact types table
  getTypes() {
    this.api.getContactTypes().subscribe(res => {
      if (res.error) {
        alert('error');
      }
      else {
        for (let index = 0; index < res.length; index++) {
          this.contactTypes.push(res[index]);
        }
      }
    });
  }

  // gets the contacts to the select tag
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

  // creates an object and send it to the api in json format
  createReservation() {
    let reservation = {
      ContactID: this.form.controls.ContactName.value,      
      ContactName: $('#contactType').text(),
      ContactType: this.form.controls.ContactType.value,
      Phone: this.form.controls.Phone.value,
      BirthDate: this.form.controls.BirthDate.value,
      editorContent: this.form.controls.editorContent.value
    };
    
    this.api.postReservation(reservation).subscribe(
      data => { alert('Sucessfully created') },
      err => { console.log(err) }
    );

    this.router.navigateByUrl('reservations');
  }

  // using jquery to fill the related fields of the contact
  autofill() {    
    let contact = this.form.controls.ContactName.value;
    let obj:any;
    this.contacts.forEach((element: { id: any; }) => {
      if (element.id == contact) {
        obj = element;
      }      
    });    
    
    $(`#contactType option[value='${obj.contactTypeId}']`).prop('selected', true);
    $('#phone').val(obj.phoneNumber);
    $('#birthDate').val(formatDate(obj.birthDate, 'yyyy-MM-dd', 'en-US'));
  }
}
