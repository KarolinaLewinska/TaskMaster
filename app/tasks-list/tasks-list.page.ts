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
    private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  ionViewWillEnter() {}

  async getTasks() {
    let loader = this.loadingController.create({
      message: "Trwa logowanie, proszę czekać..."
    });
    (await loader).present();

    try {
      this.firestore.collection("tasks")
      .snapshotChanges()
      .subscribe(data => {
        this.tasks = data.map(m => {
          return {
            id: m.payload.doc.id,
            deadline: m.payload.doc.data()["deadline"],
            title: m.payload.doc.data()["title"],
            // description: m.payload.doc.data()["description"],
            // category: m.payload.doc.data()["category"],
            // priority: m.payload.doc.data()["priority"],
          };
        })
      });
    } catch(err) {
      this.showToast(err);
    }
    
  }
  showToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 5000
    })
    .then(toastData => toastData.present()); 
  }

}
