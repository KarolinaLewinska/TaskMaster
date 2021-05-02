import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  backToHomePage() {
    this.route.navigate(['/home']);
  }
  getRegisterPage() {
    this.route.navigate(['/register'])
  }
  getTasksListPage() {
    this.route.navigate(['/tasks-list'])
  }

}
