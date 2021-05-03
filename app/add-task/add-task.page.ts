import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Task } from "../models/task"


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})

export class AddTaskPage implements OnInit {
  // myDate: String = new Date().toISOString();
  task = {} as Task;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private navController: NavController,
    private angularFirestore: AngularFirestore) { 
    
  }

  ngOnInit() {
  }
  async addTask(task: Task) {
    if (this.validateForms()) {
      let loader = this.loadingController.create({
        message: "Trwa dodawanie zadania, proszę czekać..."
      });
      (await loader).present();

      try {
        this.angularFirestore.collection("tasks").add(task);

      } catch(err) {
        this.showToast(err);
      }
      (await loader).dismiss();
      this.navController.navigateRoot("tasks-list");
    }
  }

  validateForms() {
    if(!this.task.title) {
      this.showToast("Tytuł zadania jest wymagany!")
      return false;
    }
    if(!this.task.description) {
      this.showToast("Opis zadania jest wymagany!")
      return false;
    }
    return true;
  }

  showToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 5000
    })
    .then(toastData => toastData.present()); 
  }
}
