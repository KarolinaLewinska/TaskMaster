import { Component, OnInit } from '@angular/core';
import { Task } from "../shared/task";
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})

export class TaskDetailsPage implements OnInit {
  task = {} as Task;
  constructor(
    private route: ActivatedRoute,
    public ngFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.task = params["task"]
  });
  }
}
