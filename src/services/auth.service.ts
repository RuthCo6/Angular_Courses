import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth/';
  private tokenKey = 'token';  // שם המפתח שבו נשמור את הטוקן ב-sessionStorage

  constructor(private http: HttpClient) { }

  // שליפת הטוקן מה-sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // שמירת הטוקן ב-sessionStorage
  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  // מחיקת הטוקן
  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  // פונקציה של התחברות
  login(email: string, password: string): Observable<any> {
    const user = { email, password };
    return this.http.post(`${this.baseUrl}login`, user).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);  // שמירת הטוקן ב-sessionStorage
          sessionStorage.setItem('userId', response.userId);
          console.log(sessionStorage.getItem("token"));
          console.log(localStorage.getItem("userId"));
        }
      })
    );
  }

  // פונקציה של רישום
  signUp(name: string, email: string, password: string, role: string): Observable<any> {
    const user = { name, email, password, role };
    console.log(user);
    return this.http.post(`${this.baseUrl}register`, user).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);  // שמירת הטוקן ב-sessionStorage
          console.log(sessionStorage.getItem("token"));
        }
      })
    );
  }
}
