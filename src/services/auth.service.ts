import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'  // המודול הזרקת שירותים ב-Angular
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth/';
  private tokenKey = 'token';  // שם המפתח שבו נשמור את הטוקן ב-sessionStorage
  private userIdKey = 'userId';  // מפתח למזהה המשתמש ב-sessionStorage

  constructor(private http: HttpClient) { }

  // שליפת הטוקן מה-sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);  // מחזיר את הטוקן שנשמר
  }

  // שמירת הטוקן ב-sessionStorage
  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);  // שמירת הטוקן ב-sessionStorage
  }

  // מחיקת הטוקן
  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);  // מחיקת הטוקן מה-sessionStorage
  }

  // שליפת מזהה המשתמש (ID)
  getUserId(): string | null {
    return sessionStorage.getItem(this.userIdKey);  // מחזיר את מזהה המשתמש
  }

  // שמירת מזהה המשתמש ב-sessionStorage
  setUserId(userId: string): void {
    sessionStorage.setItem(this.userIdKey, userId);  // שמירת מזהה המשתמש
  }

  // מחיקת מזהה המשתמש
  clearUserId(): void {
    sessionStorage.removeItem(this.userIdKey);  // מחיקת מזהה המשתמש
  }

  // פונקציה של התחברות
  login(email: string, password: string): Observable<any> {
    const user = { email, password };  // אובייקט למידע על המשתמש
    return this.http.post(`${this.baseUrl}login`, user).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);  // שמירת הטוקן ב-sessionStorage
          this.setUserId(response.userId);  // שמירת מזהה המשתמש ב-sessionStorage
          console.log(sessionStorage.getItem("token"));
          console.log(sessionStorage.getItem("userId"));
        }
      })
    );
  }

  // פונקציה של רישום
  signUp(name: string, email: string, password: string, role: string): Observable<any> {
    const user = { name, email, password, role };  // אובייקט למידע על המשתמש
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
