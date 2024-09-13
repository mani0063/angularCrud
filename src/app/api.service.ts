import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl;
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/v1/user`, data);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/v1/auth/login`, data);
  }

  getData(): Observable<any> {
     const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.getToken()}`
  });
    return this.http.get<any>(`${this.apiUrl}api/v1/user`,{ headers });
  }
  userProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<any>(`${this.apiUrl}api/v1/auth/profile`, { headers });
  }
  forgetpassword(email:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}api/v1/user/forgetPassword`, { email});
  }
  logout(): void {
    localStorage.removeItem('authToken'); // Clear the token
  }
}
