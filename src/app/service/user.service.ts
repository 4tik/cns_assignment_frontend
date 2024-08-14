import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:8090/api/v1/users';
  
  constructor(private http: HttpClient) {}


  async getIdAndName(): Promise<any> {
    const url = `${this.BASE_URL}/get-id-and-name`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    try {
      return this.http.get<any>(url, {headers}).toPromise();
    } catch (error) {
      throw error;
    }
  }
}
