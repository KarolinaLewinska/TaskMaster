import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Task } from "../shared/task";
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  task = {} as Task;
  constructor(
    private navCtrl : NavController,
    private route: ActivatedRoute,
    private database: AngularFirestore,
    public ngFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.task = params["task"]
  });
  }
}
