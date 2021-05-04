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
    private navController: NavController,
    private navParams: NavParams) { 
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
    try {
      let currentUser = firebase.auth().currentUser;
      if(currentUser){
				this.angularFirestore.collection("users").doc(currentUser.uid).collection('tasks').doc(id).valueChanges()
        .subscribe(data => {
          this.task = data.map(m => {
            return {
              id: m.payload.doc.id,
              deadline: m.payload.doc.data()["deadline"],
              title: m.payload.doc.data()["title"],
              description: m.payload.doc.data()["description"],
              category: m.payload.doc.data()["category"],
              priority: m.payload.doc.data()["priority"],
            };
          })
        });
			}
    } 
    catch(err) {

    }
  }
  async editTask(task: Task) {
    let currentUser = firebase.auth().currentUser;
    if (this.validateForms()) {
      let loader = this.loadingController.create({
        message: "Trwa aktualizowanie zadania, proszę czekać..."
      });
      (await loader).present();

      try {
        await this.angularFirestore.collection("users").doc(currentUser.uid).collection('tasks').doc(this.id).update(task);
        
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
