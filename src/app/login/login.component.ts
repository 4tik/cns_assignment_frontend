import { AccountService } from './../service/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login = {
    userName: '',
    password: '',
  };
  errorText: string = '';

  constructor(
    private readonly accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async singin(loginForm: NgForm) {
    try {
      const response = await this.accountService.login(this.login);
      if (response.status == 200) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('userId', response.data.userId);
        this.router.navigate(['/home']);
      } else {
        this.login.password = '';
        this.showError('invalid login. please try again');
      }
    } catch (error: any) {
      this.login.password = '';
      this.showError('invalid login. please try again');
    }
  }

  showError(error: string) {
    this.errorText = error;
    setTimeout(() => {
      this.errorText = '';
    }, 3000);
  }
}
