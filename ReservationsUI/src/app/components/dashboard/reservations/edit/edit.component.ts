import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from "ngx-editor";
import $ from "jquery";
import { ReservationsService } from 'src/app/services/reservations/reservations.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  editor: Editor;
  contactTypes: any;
  contacts: any = [];
  html: '';
  today: string;

  constructor(private fb: FormBuilder, private api: ReservationsService, private _ActivatedRoute: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      ContactId: ['', [Validators.required]],
      ContactName: ['', [Validators.required]],
      ContactType: ['', [Validators.required]],
      Phone: [''],
      BirthDate: ['', [Validators.required]],
      editorContent: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // setting the max value for birthdate
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.editor = new Editor();
    this.getReservation();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  editReservation() {
    // check form status 
    if (this.form.status == "VALID") {
      // create json 
      let reservation = {
        Id: this.form.controls.id.value,
        ContactId: this.form.controls.ContactId.value,
        Description: this.form.controls.editorContent.value,
        BirthDate: formatDate(this.form.controls.BirthDate.value, 'yyyy-MM-dd', 'en-US'),
        ContactTypeId: this.form.controls.ContactType.value,
        PhoneNumber: this.form.controls.Phone.value,
        ContactName: this.form.controls.ContactName.value,
        ContactType: $('#contactType').text()
      }

      console.log(reservation);

      // using PUT to update the elemet
      this.api.putReservation(reservation, reservation.Id).subscribe(
        data => { },
        err => { console.log(err) }
      );

      // to refresh data table date
      alert('Sucessfully updated')
      this.router.navigateByUrl('reservations');
    }
    else {
      alert('Incorrect or missing values!');
    }
  }

  // get the reservation and populate the form fields of contact info
  getReservation() {
    // getting reservation 
    let Id = parseInt(this._ActivatedRoute.snapshot.paramMap.get("id"));
    this.api.getReservation(Id).subscribe(res => {
      if (res.err) {
        alert('not found');
      }
      else {

        // get the data for option tag
        this.contactTypes = {
          id: res.contactTypeId,
          type: res.contactType
        }

        // filling the form 
        this.form.patchValue({
          id: res.id,
          ContactId: res.contactId,
          ContactName: res.contactName,
          ContactType: res.contactTypeId,
          Phone: res.phoneNumber,
          BirthDate: formatDate(res.birthDate, 'yyyy-MM-dd', 'en-US'),
          editorContent: res.description
        })

        $('#contactType').prop('disabled', true);
      }
    });
  }

}
