import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../shared/user';
import { AuthenticationService } from "../shared/authServices";
import { Router } from "@angular/router";

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
    private navController: NavController,
    private authServices: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  async login(user: User) {
    if (this.validateForms()) {
      let loader = this.loadingController.create({
        message: "Proszę czekać..."
      });
      (await loader).present();

      try {
        await this.authServices.LogIn(user.email, user.password)
        
        
      } catch(err) {
        var errorCode = err.code;
        var errorMessage = err.message;

        if (errorCode == 'auth/internal-error') {
          errorMessage="Błąd uwierzytelniania!"
          this.showToast(errorMessage);
        } 
        else if (errorCode == 'auth/user-not-found') {
          errorMessage="Podany użytkownik nie istnieje!"
          this.showToast(errorMessage);
        }
        else if (user.email || user.password) {
          errorMessage="Nieprawidłowy adres email lub hasło!"
          this.showToast(errorMessage);
        }
        else {
          this.showToast(err);
        }
      }
      (await loader).dismiss();
    }
  }
  
  validateForms() {
    if(!this.user.email) {
      this.showToast("Adres email jest wymagany!")
      return false;
    }
    if(!this.user.password) {
      this.showToast("Hasło jest wymagane!")
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
