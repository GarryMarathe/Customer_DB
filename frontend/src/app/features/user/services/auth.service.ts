import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';  // Import CookieService
import { User } from '../models/user.interface';
import { AuthResponse } from '../models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user'; // Replace with your backend API URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  // Signup Method
  signup(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, user);
  }

  // Login Method
  login(email: string, password: string): Observable<AuthResponse> {
    const body = { email, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body);
  }

  // Store Token in Cookie
  setToken(token: string): void {
    this.cookieService.set('token', token, 1);  // Set token in cookie for 1 day
  }

  // Get Token from Cookie
  getToken(): string | null {
    return this.cookieService.get('token');
  }

  // Check if the user is logged in by checking if the token exists in cookies
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
