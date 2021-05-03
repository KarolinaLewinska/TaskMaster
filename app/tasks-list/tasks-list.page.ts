import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {
  tasks: any;
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private angularFirestore: AngularFirestore) { }

  ngOnInit() {
    this.getTasks();
  }

  async getTasks() {
    let loader = this.loadingController.create({
      message: "Pobieranie listy zadań, proszę czekać..."
    });
    (await loader).present();

    try {
      this.angularFirestore.collection("tasks")
      .snapshotChanges()
      .subscribe(data => {
        this.tasks = data.map(m => {
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

    } catch(err) {
      this.showToast(err);
    }
    (await loader).dismiss();
  }

  async deleteTask(id: string) {
    let loader = this.loadingController.create({
      message: "Trwa usuwanie, proszę czekać..."
    });
    (await loader).present();
    await this.angularFirestore.doc("tasks/" + id).delete();
    (await loader).dismiss();
  }

  showToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 5000
    })
    .then(toastData => toastData.present()); 
  }
}
