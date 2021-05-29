import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  userData: any;
  public loggedin: boolean;

  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public navController: NavController) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  LogIn(email, password) {
    this.loggedin = true;
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then((res) => {
      this.router.navigate(['tasks-list']);
    })
  }
  Register(email, password) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.navController.navigateBack('login');
    })
  }
  isLoggedIn()
  {
    if (this.loggedin == true) {
      return true;
    }
    else {
      return false;
    }
  }
}