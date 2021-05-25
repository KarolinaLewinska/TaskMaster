import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController, NavParams } from '@ionic/angular';
import firebase from 'firebase';
import { Task } from '../shared/task'

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
    this.getTask(this.id)
  }
  
  async getTask(id: string) {
    let loader = this.loadingController.create({
      message: "Proszę czekać..." 
    });

    (await loader).present();
    
      let currentUser = firebase.auth().currentUser;
      this.angularFirestore
      .collection("users").doc(currentUser.uid).collection('tasks')
      .doc(id).valueChanges()
      .subscribe(data => {
            this.task.deadlineDate = data["deadlineDate"];
            this.task.deadlineTime = data["deadlineTime"];
            this.task.title = data["title"];
            this.task.description = data["description"];
            this.task.category = data["category"];
            this.task.priority = data["priority"];  
      });
      (await loader).dismiss();
  }
  async editTask(task: Task) {
    let currentUser = firebase.auth().currentUser;
    if (this.validateForms()) {
      let loader = this.loadingController.create({
        message: "Proszę czekać..."
      });
      (await loader).present();

      try {
        await this.angularFirestore.collection("users")
        .doc(currentUser.uid).collection('tasks')
        .doc(this.id).update(task);
        
      } catch(err) {
        this.showToast(err);
      }
      
      (await loader).dismiss();
      this.navController.navigateRoot("tasks-list");
    }
  }
  validateForms() {
    if (!this.task.deadlineDate) {
      this.showToast("Termin wykonania jest wymagany!")
      return false;
    }
    if (!this.task.deadlineTime) {
      this.showToast("Godzina wykonania jest wymagana!")
      return false;
    }
    if (!this.task.title) {
      this.showToast("Tytuł zadania jest wymagany!")
      return false;
    }
    if (!this.task.description) {
      this.showToast("Opis zadania jest wymagany!")
      return false;
    }
    if (!this.task.category) {
      this.showToast("Kategoria zadania jest wymagana!")
      return false;
    }
    if (!this.task.priority) {
      this.showToast("Priorytet zadania jest wymagany!")
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
