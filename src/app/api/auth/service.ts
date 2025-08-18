import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { mapLoginResponse, mapSignupResponse, mapRefreshTokenResponse } from "./mapping";
import type { Login, LoginResponse, RefreshTokenResponse, Signup } from "../../types";

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(req: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`, req).pipe(
      map(mapLoginResponse)
    )
  }
  signup(req: Signup): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/auth/signup`, req).pipe(
      map(mapSignupResponse)
    )
  }
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/auth/logout`, {})
  }
  refreshToken(): Observable<RefreshTokenResponse> {
    return this.http.get<string>(`${this.apiUrl}/api/auth/refresh-token`, {
      headers: {
        'Content-Type': 'application/json',
        'x-refresh-token': `Bearer ${localStorage.getItem('refreshToken')}`,
      }
    }).pipe(
      map(mapRefreshTokenResponse)
    )
  }
}
