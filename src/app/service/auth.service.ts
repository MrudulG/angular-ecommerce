import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth/login';
  token: Subject<string> = new BehaviorSubject<string>("correcttoken");
  badtoken: Subject<string> = new BehaviorSubject<string>("badtoken");
  authState$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string):Observable<any> {
    const request = {
      "username": username,
      "password": password
    }
     return this.http.post<any>(this.baseUrl, request).pipe(
      // Optional: Use RxJS operators to handle transformations or side effects
      map(data => {
        // localStorage.setItem('authToken', data.token);
        // Store the token (if required)
        this.token = data.token; // Assuming `data.token` contains the token
        return data.token; // Pass the response to the caller
      })
    );
    
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) return true;

    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate < new Date();
  }
}
