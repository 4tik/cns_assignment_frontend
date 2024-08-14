import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Project } from '../models/project.model';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{
  project: Project = {
    id: 0,
    name: '',
    introduce: '',
    status: 0,
    startDateTime: null,
    endDateTime: null,
    users: Array,
    userId: Number(localStorage.getItem('userId')),
    projectMembers: null,
    createdBy:0,
  }

  errorText: string = '';
  members: User[] = [];
  userIds: number[] = [];

  limitUserError: string = '';
  isDisableCheck:boolean = false;

  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserIdAndName();
  }

  async getUserIdAndName() {
    const response = await this.userService.getIdAndName();
    this.members = response.data;
  }

  async saveProject(projectForm: NgForm){
    try {
      this.project.users.push(this.project.userId);
      const response = await this.projectService.saveProject(this.project);
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

  userIdIsExist(userId: Number): boolean {
    return this.userIds.includes(Number(userId));
  }

  checkUser(event: any): void {
    this.limitUserError='';
    if (event.checked) {
      this.userIds.push(Number(event.source.value));
    } else {
      this.userIds.forEach(
        (item, index) => {
          if (item == event.source.value) {
            this.userIds.splice(index, 1);
          }
        }
      );
    }
    if(this.userIds.length>=2){
      this.isDisableCheck=true;
      this.limitUserError='**cannot assign moren then two(02) members';
    }
    else{
      this.isDisableCheck=false;
      this.limitUserError='';
    }
    // console.log(this.userIds);
    this.project.users = this.userIds;
  }

  showError(error: string) {
    this.errorText = error;
    setTimeout(() => {
      this.errorText = '';
    }, 3000);
  }
}
