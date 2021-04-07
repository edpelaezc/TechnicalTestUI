import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

// service for the reservations operations
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
      tap((res) => {
        if (res) {
          return res;
        }
        else {
          return { error: 'Error' }
        }
      })
    );
  }

  getReservation(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/Reservations/${id}`).pipe(
      tap(res => {
        if (res) {
          return res;
        }
        else {
          return { error: 'error' }
        }
      })
    );
  }

  // gets the contacts to autocomplete information based on contact id
  getContactsList(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/contacts`).pipe(
      tap(res => {
        if (res) {
          return res;
        }
        else {
          return { error: 'Error'}
        }
      })
    );
  }

  // gets the contacts types
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

  // edit the reservation
  putReservation(reservation: any, id: any): Observable<any> {
    return this.httpClient.put(environment.apiURL + `/reservations/${id}`, JSON.stringify(reservation), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(catchError(this.handleError));
  }

  // creates a reservation
  postReservation(reservation: any): Observable<any> {    
    return this.httpClient.post(environment.apiURL + '/reservations', JSON.stringify(reservation), { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(catchError(this.handleError));
  }

  deleteReservation(id: string): Observable<any> {
    return this.httpClient.delete(environment.apiURL + `/reservations/${id}`).pipe(catchError(this.handleError));
  }
}
