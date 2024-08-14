import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private BASE_URL = 'http://localhost:8090/api/v1/projects';

  constructor(private http: HttpClient) { }

  async saveProject(project: Project): Promise<any> {
    const url = `${this.BASE_URL}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    try {
      return this.http.post<any>(url, project, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async getProjects(): Promise<any> {
    const url = `${this.BASE_URL}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    try {
      return this.http.get<any>(url, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async getProjectsByUserId(userId: Number): Promise<any> {
    const url = `${this.BASE_URL}/get-user-id/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    try {
      return this.http.get<any>(url, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async getProjectById(id: number): Promise<any> {
    const url = `${this.BASE_URL}/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    try {
      return this.http.get<any>(url, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async updateProject(project: Project): Promise<any> {
    const url = `${this.BASE_URL}/${project.id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    try {
      return this.http.put<any>(url, project, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number): Promise<any> {
    const url = `${this.BASE_URL}/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    try {
      return this.http.delete<any>(url, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }


  generateReport(): Observable<Blob> {
    const url = `${this.BASE_URL}/get-report`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/pdf'
    })
    return this.http.get(url, { headers,responseType: 'blob' });
  }
}
