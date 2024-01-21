import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthResponse } from "@models/auth.model";
import {tap} from 'rxjs'
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private tokenService = inject(TokenService)

  login(username: string, password: string) {
    const url = environment.authUrl
    return this.http.post<AuthResponse>(url, {username, password})
      .pipe(
        tap(res => this.tokenService.saveToken(res.token))
      )
  }

  logout() {
    this.tokenService.clearToken()
  }
}