// import { Injectable } from '@angular/core';
// import { Observable, tap, catchError } from 'rxjs'; // הוספתי את catchError
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private baseUrl = 'http://localhost:3000/api/auth/';
  
//   constructor(private http: HttpClient) {}

//   login(email: string, password: string): Observable<any> {
//     const user = { email, password };
//     return this.http.post(`${this.baseUrl}login`, user).pipe(
//       tap((response: any) => {
//         if (response.token) {
//           sessionStorage.setItem('token', response.token);
//           localStorage.setItem('userId', response.userId);
//           console.log(sessionStorage.getItem('token'));
//           console.log(localStorage.getItem('userId'));
//         }
//       }),
//       catchError((error) => {
//         console.error('Login error:', error);
//         throw error; // או אפשר להחזיר Observable.empty() אם רוצים פשוט להתעלם מהשגיאה
//       })
//     );
//   }

//   signUp(name: string, email: string, password: string, role: string): Observable<any> {
//     const user = { name, email, password, role };
//     console.log(user);
//     return this.http.post(`${this.baseUrl}register`, user).pipe(
//       tap((response: any) => {
//         if (response.token) {
//           sessionStorage.setItem('token', response.token);
//           console.log(sessionStorage.getItem('token'));
//         }
//       }),
//       catchError((error) => {
//         console.error('SignUp error:', error);
//         throw error;
//       })
//     );
//   }
// }


import { Injectable } from '@angular/core';
import {  Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl ='http://localhost:3000/api/auth/';
  constructor(private http: HttpClient){}
login(email:string,password:string):Observable<any>
{
    const user={email,password}
return this.http.post(`${this.baseUrl}login`,user).pipe(
  tap((response:any)=>{
    if(response.token){
      sessionStorage.setItem("token",response.token);
      localStorage.setItem('userId',response.userId)
      console.log(sessionStorage.getItem("token"));
      console.log(localStorage.getItem("userId"));     
    }
  })
)
}
  signUp(name:string,email:string,password:string,role:string):Observable<any>{
    const user={name,email,password,role}
    console.log(user)
    return this.http.post(`${this.baseUrl}register `,user).pipe(
      tap((response:any)=>{
        if(response.token){
          sessionStorage.setItem("token",response.token)
          console.log(sessionStorage.getItem("token"));
          
        }
      })
    )
  }
}
