import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth/login';
  isLoggedIn = false;
  private usernameSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }).pipe(
      tap((response: any) => {
        this.isLoggedIn = true;
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
        this.usernameSubject.next(username);
      })
    );
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getUsername() {
    return this.usernameSubject.asObservable();
  }

  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  isUser(): boolean {
    return this.getUserRole().includes('ROLE_USER');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true });
  }
}
