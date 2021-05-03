import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from "../models/user.mode"

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {} as User;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private angularFireAuth: AngularFireAuth,
    private navController: NavController) { }
    
  ngOnInit() {
  }

  async register(user: User) {
    if(this.formValidation()) {
      let loader = this.loadingController.create({
          message: "Trwa rejestracja, proszę czekać..."
      });
      (await loader).present();

      try {
        await this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then(data => {
          console.log(data)
          this.navController.navigateBack("login");
        });
      } catch(err) {
        this.showToast(err);
      }
      (await loader).dismiss();
    }
  }

  formValidation() {
    if(!this.user.email) {
      this.showToast("Podaj adres email")
      return false;
    }
    if(!this.user.password) {
      this.showToast("Podaj hasło")
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
