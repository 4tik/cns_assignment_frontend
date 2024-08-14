import { AccountService } from './../service/account.service';
import { Component, OnInit } from '@angular/core';
import { Register } from '../models/register.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register: Register = {
    userName: '',
    email: '',
    password: '',
  };
  errorText: string = '';

  constructor(
    private readonly accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  async singup(singupForm: NgForm) {
    try {
      const response = await this.accountService.singup(this.register);
      if (response.status == 200) {
        this.router.navigate(['/login']);
      } else {
        this.register.password = '';
        this.errorText = response.message;
      }
    } catch (error: any) {
      this.register.password = '';
      this.errorText = 'something is wrong';
    }
  }
}
