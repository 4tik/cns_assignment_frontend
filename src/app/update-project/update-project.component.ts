import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { Route } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  id: any = 0;
  project: Project = {
    id: 0,
    name: '',
    introduce: '',
    status: 0,
    startDateTime: null,
    endDateTime: null,
    users: null,
    userId: 0,
    projectMembers: null,
    createdBy: 0,
  }
  members: User[] = [];
  userIds: number[] = [];
  errorText: string = '';
  limitUserError: string = '';
  isDisableCheck:boolean = false;

  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.getUserIdAndName();
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getById();
  }

  async getUserIdAndName() {
    const response = await this.userService.getIdAndName();
    this.members = response.data;
  }

  async getById() {
    const response = await this.projectService.getProjectById(this.id);
    var user_new_id: number[] = [];
    if (response.status == 200) {
      this.project = response.data;
      this.project.userId=Number(Number(localStorage.getItem('userId')));
      response.data.projectMembers.forEach(function (item: any) {
        user_new_id.push(Number(item.userId));
      });
      this.userIds = user_new_id;
      if(this.userIds.length>=3){
        this.isDisableCheck=true;
        this.limitUserError='**cannot assign moren then two(02) members';
      }
    } else {
      // this.errorText = response.message;
    }
  }

  async updateProject(projectForm: NgForm) {
    try {
      const response = await this.projectService.updateProject(this.project);
      if (response.status == 200) {
        this.router.navigate(['/home']);
      } else {
        this.errorText = response.message;
      }
    } catch (error: any) {
      console.log(error);
      // this.errorText = 'something is wrong';
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
    if(this.userIds.length>=3){
      this.isDisableCheck=true;
      this.limitUserError='**cannot assign moren then two(02) members';
    }
    else{
      this.isDisableCheck=false;
      this.limitUserError='';
    }
    this.project.users = this.userIds;
  }


}
