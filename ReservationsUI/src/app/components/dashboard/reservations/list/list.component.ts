import { Component, OnInit } from '@angular/core';
import { ReservationsService } from "../../../../services/reservations/reservations.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private api: ReservationsService, private http: HttpClient) { }
  
  reservations:any = [];

  ngOnInit(): void {
    this.getReservations();    
  }

  edit(id:string) {}

  // gets the reservations list to use in page load
  getReservations() {
    this.api.getReservationsList().subscribe( res => {
      if (res.error) {
        alert('error');
      }
      else {
        for (let index = 0; index < res.length; index++) {
          this.reservations.push(res[index]);
        }
      }
    });    
  }

}

