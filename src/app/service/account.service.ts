import { Login } from './../models/login.model';
import { Register } from '../models/register.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private BASE_URL = 'http://localhost:8090/api/v1/account';
  constructor(private http: HttpClient) {}

  async login(login: Login): Promise<any> {
    const url = `${this.BASE_URL}/login`;
    try {
      return this.http.post<any>(url, login).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async singup(register: Register): Promise<any> {
    const url = `${this.BASE_URL}/registration`;
    try {
      return this.http.post<any>(url, register).toPromise();
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  /***AUTHEMNTICATION METHODS */
  logOut(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }
}
