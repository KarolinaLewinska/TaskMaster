import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  backToHomePage() {
    this.route.navigate(['/home']);
  }

}
