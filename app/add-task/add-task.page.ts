import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  backToTasksListPage() {
    this.route.navigate(['/tasks-list']);
  }

}
