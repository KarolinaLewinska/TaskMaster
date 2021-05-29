import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../shared/user'
import { AuthenticationService } from '../shared/authServices';

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
    private authServices: AuthenticationService) { }
    
  ngOnInit() {
  }

  async register(user: User) {
    if (this.validateForms()) {
      let loader = this.loadingController.create({
          message: 'Proszę czekać...'
      });
      (await loader).present();

      try {
        await this.authServices.Register(user.email, user.password);
        
      } catch(err) {
        var errorCode = err.code;
        var errorMessage = err.message;

        if (errorCode == 'auth/internal-error') {
          errorMessage='Błąd uwierzytelniania!'
          this.showToast(errorMessage);
          navigator.vibrate(3000);
        } 
        else if (errorCode == 'auth/email-already-in-use') {
          errorMessage='Użytkownik o podanym adresie email już istnieje!'
          this.showToast(errorMessage);
          navigator.vibrate(3000);
        }
        else if (user.email || user.password) {
          errorMessage='Nieprawidłowy format adresu email lub hasła!'
          this.showToast(errorMessage);
          navigator.vibrate(3000);
        }
        else {
          this.showToast(err);
          navigator.vibrate(3000);
        }
      }
      (await loader).dismiss();
    }
  }
  validateForms() {
    if (!this.user.email) {
      this.showToast('Adres email jest wymagany!')
      navigator.vibrate(3000);
      return false;
    }
    if (!this.user.password) {
      this.showToast('Hasło jest wymagane!')
      navigator.vibrate(3000);
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
document.addEventListener('deviceready', onDeviceReady, false);
  function onDeviceReady() {
  console.log(navigator.vibrate);
}
