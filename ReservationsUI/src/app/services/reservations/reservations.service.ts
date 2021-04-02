import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }

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

  getContactTypes(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/ContactTypes`).pipe(
      tap(res => {
        if (res) {
          return res; 
        } 
        else {
          return { error: 'error'}
        }
      })
    );
  }

  postReservation(reservation: any): Observable<any> {    
    return this.httpClient.post(environment.apiURL + '/reservations', JSON.stringify(reservation), { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(catchError(this.handleError));
  }
}
