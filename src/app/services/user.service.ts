import { Injectable, OnInit } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import  { User } from "../models/user.model"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {   
     return this.http.get<User[]>(`${environment.apiUrl}/User`);
  }

  getUserById(id: number): Observable<User> {
     return this.http.get<User>(`${environment.apiUrl}/User/${id}`);
  }

  createUser(userData: Partial<User>): Observable<User> { 
    return this.http.post<User>(`${environment.apiUrl}/User`, userData);
  }

  updateUser(id: number, userData: Partial<User>): Observable<User> {
     return this.http.put<User>(`${environment.apiUrl}/User/${id}`, userData);
  }

  deleteUser(id: number): Observable<void> {
  
     return this.http.delete<void>(`${environment.apiUrl}/User/${id}`);
  }

  getUserStats(): Observable<any> {
    // In a real app, this would call your API
     return this.http.get<any>(`${environment.apiUrl}/User/stats`);

  }

  getUserDetails(id: number): Observable<any> {
    
     return this.http.get<any>(`${environment.apiUrl}/User/${id}/details`)
  }

  getUserActivities(id: number, limit = 10): Observable<any[]> {
   
    return this.http.get<any[]>(`${environment.apiUrl}/User/${id}/activities?limit=${limit}`);

  }

  updateUserProfile(id: number, profileData: any): Observable<User> {
   
     return this.http.put<User>(`${environment.apiUrl}/User/${id}`, profileData);

  }

  changePassword(id: number, currentPassword: string, newPassword: string): Observable<void> {
    
     return this.http.post<void>(`${environment.apiUrl}/User/${id}/change-password`, {
     currentPassword,
      newPassword
    });

  }
}
