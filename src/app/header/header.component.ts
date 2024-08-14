import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(
    private readonly accountService: AccountService,
    private readonly projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.accountService.isAuthenticated();
  }

  generateReport(): void{
    this.projectService.generateReport().subscribe((data: Blob) => {
      const fileName = `report.pdf`;
      saveAs(data, fileName);
    }, error => {
      console.error('Error generating report:', error);
    });
    this.projectService.generateReport();
  }

  logout(): void {
    this.isAuthenticated = false;
    this.accountService.logOut();
    this.router.navigate(['/login']);
  }

}
