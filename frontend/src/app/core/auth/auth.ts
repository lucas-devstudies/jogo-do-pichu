import { Injectable } from '@angular/core';
import { TokenService } from '../services/token-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../../shared/models/Token';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  apiUrl:string = environment.SERVIDOR;

  constructor(private http:HttpClient,private tokenService: TokenService){}

  login(email:string,password:string):Observable<Token>{
    return this.http.post<Token>(`${this.apiUrl}/auth/login`, { email,password });
  }
  refresh(token:string):Observable<Token>{
    return this.http.post<Token>(`${this.apiUrl}/api/user`, { token });
  }

  salvarToken(Token: string) {
    this.tokenService.setToken(Token);
  }

  logout() {
    this.tokenService.logout();
  }
}