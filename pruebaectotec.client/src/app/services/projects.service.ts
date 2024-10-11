import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  baseUrl = 'https://localhost:7205/projects/';
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('BearerToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProjects(): Observable<Project[]> {
    const headers = this.getHeaders();
    return this.http.get<Project[]>(this.baseUrl + 'GetAllProjects', { headers });
  }

  createProject(project: Project): Observable<Project> {
    const headers = this.getHeaders();
    return this.http.post<Project>(this.baseUrl + 'CreateProject/', project, { headers });
  }

  updateProject(project: Project): Observable<Project> {
    const headers = this.getHeaders();
    return this.http.put<Project>(this.baseUrl + 'UpdateProject/', project, { headers });
  }

  deleteProject(id: number): Observable<boolean> {
    //const params = new HttpParams().set('id', '1');
    //this.http.delete(this.baseUrl + 'DeleteProject', { params });

    const headers = this.getHeaders();
    return this.http.delete<boolean>(this.baseUrl + 'DeleteProject?id=' + id, { headers });
  }
}
