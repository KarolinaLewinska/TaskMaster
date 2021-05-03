import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Task } from '../models/task'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  task = {} as Task;
  id: any;
  constructor (
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private angularFirestore: AngularFirestore,
    private toastController: ToastController,
    private navController: NavController) { 
      this.id = this.activatedRoute.snapshot.paramMap.get("id");
    }

  ngOnInit() {
    this.getTask(this.id);
  }

  async getTask(id: string) {
    let loader = this.loadingController.create({
      message: "Proszę czekać..."
    });

    (await loader).present();
    this.angularFirestore.doc("tasks/" + id)
    .valueChanges()
    .subscribe(data => {
      this.task.deadline = data['deadline'];
      this.task.title = data['title'];
      this.task.description = data['description'];
      this.task.category = data['category'];
      this.task.priority = data['priority']; 
    });
    (await loader).dismiss();
  }
  async editTask(task: Task) {
    if (this.validateForms()) {
      let loader = this.loadingController.create({
        message: "Trwa aktualizowanie zadania, proszę czekać..."
      });
      (await loader).present();

      try {
        await this.angularFirestore.doc("tasks/" + this.id).update(task);
        
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
