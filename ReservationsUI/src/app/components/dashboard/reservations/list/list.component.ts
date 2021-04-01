import { Component, OnInit } from '@angular/core';
import { ReservationsService } from "../../../../services/reservations/reservations.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private reservationsService: ReservationsService) { }
  
  reservations:any = [];

  ngOnInit(): void {
    this.getReservations();
    console.log(this.reservations);
  }

  edit(id:string) {}

  getReservations() {
    this.reservationsService.getReservationsList().subscribe( res => {
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

