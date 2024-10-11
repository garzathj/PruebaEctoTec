import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthenticatedResponse } from '../models/authenticated-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://localhost:7205/auth/';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  login(user: User): Observable<AuthenticatedResponse> {
    const headers = this.getHeaders();
    return this.http.post<AuthenticatedResponse>(this.baseUrl + 'Login/', user, { headers });
  }

  logout(): void {
    localStorage.removeItem('BearerToken');
  }
}
