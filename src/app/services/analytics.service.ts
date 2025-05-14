import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment.prod"

@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getDailyEntries(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/UserActivity/daily-entries`)
  }

  getWeeklyEntries(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/UserActivity/weekly-entries`)
  }

  getUserActivityData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/UserActivity/user-activity`)
  }

  getActionFrequencyData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/UserActivity/action-frequency`)
  }

  getPopularPages(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/UserActivity/popular-pages`)
  }

  getHourlyActivityData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/UserActivity/hourly-activity`)
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/UserActivity/total-users`)
  }

  getNewUsersToday(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/UserActivity/new-users-today`)
  }
}
