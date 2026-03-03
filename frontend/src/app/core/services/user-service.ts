import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token-service';
import { User } from '../../shared/models/User';
import { Observable } from 'rxjs';
import { toFormData } from '../utils/form-data';
import { Token } from '../../shared/models/Token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  caminho = environment.apiUrl;
  API = `${this.caminho}/auth/user`;

  constructor(private http:HttpClient, private tokenService:TokenService){}

  add(name:string,email:string,password:string):Observable<Token>{
    return this.http.post<Token>(`${this.caminho}/auth/register`,{name,email,password});
  }
  update(data: User): Observable<User> {
    const headers = this.tokenService.getAuthHeaders();
    const formData = toFormData(data);
    return this.http.patch<User>(`${this.API}${data.id}/`, formData,{headers});
  }
  //implementar depois
  updatePassword(data:User): Observable<User> {
    const headers = this.tokenService.getAuthHeaders();
    const formData = toFormData(data);
    return this.http.post<User>(`${this.API}change-password/`, formData,{headers});
  }
  me(): Observable<User>{
    const headers = this.tokenService.getAuthHeaders();
    return this.http.get<User>(`${this.API}me/`,{headers});
  }
  get_security(): Observable<User>{
    const headers = this.tokenService.getAuthHeaders();
    return this.http.get<User>(`${this.API}/`,{headers});
  }
}
