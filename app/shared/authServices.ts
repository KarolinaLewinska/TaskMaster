import { Injectable, NgZone } from "@angular/core";
import { User } from "./user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: "root",
})

export class AuthenticationService {
  userData: any;
  public loggedin: boolean;

  constructor(
    public afStore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public navController: NavController) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  LogIn(email, password) {
    this.loggedin = true;
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .catch((e) => {
      window.alert(e);
    });
  }

  Register(email, password) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.navController.navigateBack("login");
      })
      .catch((e) => {
        window.alert(e);
      });
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

  // AuthLogin(provider) {
  //   return this.angularFireAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(["tasks-list"]);
  //       });
  //       this.SetUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }

  // // Store user in localStorage
  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     password: user.password
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }
  SignOut() {
    this.loggedin = false;
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["home"]);
    });
  }
}