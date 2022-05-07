import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(props: { username: string; password: string }) {
    return this._http.post<{ access: string; refresh: string, isStaff:boolean }>(
      `${apiURL}/login/`,
      {
        username: props.username,
        password: props.password,

      }
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
