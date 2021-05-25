import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit  {
  tasks: any;
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private angularFirestore: AngularFirestore,
    private navController: NavController,
    private angularFireAuth: AngularFireAuth) { }

    ngOnInit() {
      this.getTasks();
    }

  async getTasks() {
    let loader = this.loadingController.create({
      message: "Proszę czekać..."
    });
    (await loader).present();

    try {
      let currentUser = firebase.auth().currentUser;
			this.angularFirestore.collection("users").doc(currentUser.uid)
        .collection('tasks').snapshotChanges()
        .subscribe(data => {
          this.tasks = data.map(m => {
            return {
              id: m.payload.doc.id,
              deadlineDate: m.payload.doc.data()["deadlineDate"].split('T')[0],
              deadlineTime: m.payload.doc.data()["deadlineTime"].split('T')[1].substring(0,5),
              title: m.payload.doc.data()["title"],
              description: m.payload.doc.data()["description"],
              category: m.payload.doc.data()["category"],
              priority: m.payload.doc.data()["priority"],
            };
          })
      });
			
    } catch (err) {
      this.showToast(err);
    }
    (await loader).dismiss();
  }
  async deleteTask(id: string) {
    let currentUser = firebase.auth().currentUser;
    let loader = this.loadingController.create({
      message: "Proszę czekać..."
    });
    (await loader).present();
      
    await this.angularFirestore.collection("users")
    .doc(currentUser.uid).collection('tasks').doc(id).delete();
    
    (await loader).dismiss();
  }
  showToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 5000
    })
    .then(toastData => toastData.present()); 
  }
  showDetails(taskDetails) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          task: taskDetails
        }
      };
      this.navController.navigateForward('task-details', navigationExtras);
  }
  SignOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.navController.navigateBack("home");
    });
  }
}
