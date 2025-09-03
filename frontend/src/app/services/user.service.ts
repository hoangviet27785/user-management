import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface User {
  id?: number;
  username: string;
  fullname: string;
  password?: string;
  role: string;
  self: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  username: string = '';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers() {
    return this.authService.getUsername().pipe(
      switchMap((username: string) => {
        this.username = username;
        return this.http.get<User[]>(`${this.apiUrl}/all/${username}`, {
          observe: 'response',
          withCredentials: true
        });
      }),
      map((response: HttpResponse<User[]>) => response.body ?? null)
    );
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }


  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, { withCredentials: true });
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { withCredentials: true });
  }


  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-username`, {
      params: { username },
      withCredentials: true
    });
  }
}
