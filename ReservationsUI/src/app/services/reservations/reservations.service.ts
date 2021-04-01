import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private httpClient: HttpClient) { }

  getReservationsList(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/reservations`).pipe(
      tap(async (res) => {
        if (res) {
          return res;
        }
        else {
          return { error: 'Error' }
        }
      })
    );
  }
}
