import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user.mode';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as User;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private angularFireAuth: AngularFireAuth,
    private navController: NavController) { }

  ngOnInit() {
  }

  async login(user: User) {
    if (this.formValidation()) {
      let loader = this.loadingController.create({
        message: "Trwa logowanie, proszę czekać..."
      });
      (await loader).present();

      try {
        await this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
          this.navController.navigateRoot("tasks-list");
        })

      } catch(err) {
        var errorCode = err.code;
        var errorMessage = err.message;

        if (errorCode == 'auth/internal-error') {
          errorMessage="Błąd uwierzytelniania"
          this.showToast(errorMessage);
        } 
        else if (errorCode == 'auth/user-not-found') {
          errorMessage="Podany użytkownik nie istnieje!"
          this.showToast(errorMessage);
        }
        else if (user.email || user.password) {
          errorMessage="Nieprawidłowy format adresu email lub hasła!"
          this.showToast(errorMessage);
        }
        else {
          this.showToast(err);
        }
      }
      (await loader).dismiss();
    }

  }
  formValidation() {
    if(!this.user.email) {
      this.showToast("Adres email jest wymagany")
      return false;
    }
    if(!this.user.password) {
      this.showToast("Hasło jest wymagane")
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
