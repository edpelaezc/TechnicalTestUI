import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from "../../../../services/reservations/reservations.service";
import { Editor } from "ngx-editor";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  editor: Editor;
  html: '';

  constructor(private fb: FormBuilder, private reservationsService: ReservationsService, private router: Router) {
    this.form = this.fb.group({
      ContactName: ['', [Validators.required]],
      ContactType: ['', [Validators.required]],
      Phone: [''],
      BirthDate: ['', [Validators.required]],
      editorContent: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createReservation() {    
    let reservation = {
      ContactName: this.form.controls.ContactName.value,
      ContactType: this.form.controls.ContactType.value,
      Phone: this.form.controls.Phone.value,
      BirthDate: this.form.controls.BirthDate.value,
      editorContent: this.form.controls.editorContent.value
    };
    
    this.reservationsService.postReservation(reservation).subscribe(
      data => { alert('Sucessfully created') },
      err => { console.log(err) }
    );

    this.router.navigateByUrl('reservations');  
  }
}
