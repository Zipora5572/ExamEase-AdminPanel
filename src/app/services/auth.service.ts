import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, of, throwError } from "rxjs"
import { catchError, map, tap } from "rxjs/operators"
import { Router } from "@angular/router"
import { environment } from "../../environments/environment.prod"
import { User } from "../models/user.model"


@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  private tokenKey = "auth_token"
  private userKey = "current_user"

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadStoredUser()
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem(this.userKey)
    if (storedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem(this.userKey)
        localStorage.removeItem(this.tokenKey)
      }
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  login(email: string, password: string, rememberMe: boolean): Observable<Partial<User>> {
    // In a real app, this would call your API
    // For demo purposes, we'll simulate a successful login with mock data
    return this.http
      .post<{ token: string; user: User }>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.setSession(response.token, response.user, rememberMe)
        }),
        map((response) => response.user),
        catchError((error) => {
          // For demo, we'll simulate a login with hardcoded credentials
          if (email === "admin@example.com" && password === "password") {
            const mockUser: Partial<User> = {
              id: 1,
              firstName: "Admin User",
              lastName:"D",
              email: "admin@example.com",
           
            }
            this.setSession("mock-token", mockUser, rememberMe)
            return of(mockUser)
          }
          return throwError(() => new Error("Invalid email or password"))
        }),
      )
  }

  private setSession(token: string, user: Partial<User>, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem(this.tokenKey, token)
    storage.setItem(this.userKey, JSON.stringify(user))

    if (rememberMe) {
      localStorage.setItem(this.tokenKey, token)
      localStorage.setItem(this.userKey, JSON.stringify(user))
    } else {
      sessionStorage.setItem(this.tokenKey, token)
      sessionStorage.setItem(this.userKey, JSON.stringify(user))
      // Clear localStorage to prevent conflicts
      localStorage.removeItem(this.tokenKey)
      localStorage.removeItem(this.userKey)
    }

    // this.currentUserSubject.next(user)
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.userKey)
    sessionStorage.removeItem(this.tokenKey)
    sessionStorage.removeItem(this.userKey)
    this.currentUserSubject.next(null)
    this.router.navigate(["/login"])
  }

  refreshUserData(): void {
    // In a real app, this would fetch the latest user data from the API
    // For demo purposes, we'll just update the stored user
    if (this.currentUser) {
      const updatedUser = { ...this.currentUser }
      const storage = localStorage.getItem(this.userKey) ? localStorage : sessionStorage
      storage.setItem(this.userKey, JSON.stringify(updatedUser))
      this.currentUserSubject.next(updatedUser)
    }
  }

  // hasRole(role: string): boolean {
  //   return this.currentUser?.role === role
  // }
}
