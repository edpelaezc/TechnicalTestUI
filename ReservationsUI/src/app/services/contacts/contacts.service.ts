import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

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

  // gets the contacts
  getContactsList(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/ContactsDetails`).pipe(
      tap(res => {
        if (res) {
          return res;
        }
        else {
          return { error: 'Error' }
        }
      })
    );
  }

  getContact(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/Contacts/${id}`).pipe(
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

  // gets the contacts types
  getContactTypes(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/ContactTypes`).pipe(
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

  // creates a contact
  postContact(contact: any): Observable<any> {
    return this.httpClient.post(environment.apiURL + '/contacts', JSON.stringify(contact), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(catchError(this.handleError));
  }

  putContact(contact: any, id: any): Observable<any> {
    return this.httpClient.put(environment.apiURL + `/contacts/${id}`, JSON.stringify(contact), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(catchError(this.handleError));
  }
}
