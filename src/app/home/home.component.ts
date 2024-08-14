import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { Project } from '../models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: Project[] = [];
  statusText: readonly string[] = [
    'PRE',
    'START',
    '',
    'END'
  ];
  displayedColumns: string[] = [
    'id', 'name', 'introduce', 'status','startDateTime', 'endDateTime',
    'action'
  ];
  userId = Number(localStorage.getItem('userId'));

  errorText: string = '';
  constructor(
    private readonly projectService: ProjectService,
    private router: Router
  ) {
    this.getProjects();
  }
  ngOnInit(): void {
    // this.getProjects();
  }



  // async getProjects() {
  //   const response = await this.projectService.getProjects();
  //   this.dataSource = response.data;
  // }

  async getProjects() {
    const response = await this.projectService.getProjectsByUserId(this.userId);
    console.log(response.data);
    this.dataSource = response.data;
  }

  async updateProject(id: number){
    this.router.navigate(['/update-project', id]);
  }

  async deleteById(id:number){
    if(confirm("Are you sure want to delete?")){
      try {
        const response = await this.projectService.deleteById(id);
        if (response.status == 200) {
          this.router.navigate(['/home']);
        } else {
          this.errorText = response.message;
        }
      } catch (error: any) {
        console.log(error);
        this.errorText = 'something is wrong';
      }
    }
  }
}
