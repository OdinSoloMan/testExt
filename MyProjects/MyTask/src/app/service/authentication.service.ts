import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
  ) {
    ngFireAuth.authState.subscribe(
      user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      },
    )
  }

  SignIn(email: any, password: any) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  RegisterUser(email: any, password: any) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  async SendVerificationMail() {
    return (await this.ngFireAuth.currentUser).sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      })
  }

  async PasswordRecover(passwordResetEmail: any) {
    try {
      await this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail);
      window.alert("Password reset email has been sent, please check you inbox.");
    } catch (error) {
      window.alert(error);
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  GoogleAuth() {
    // not working
    return this.AuthLogin(new GoogleAuthProvider())
  }

  async AuthLogin(provider: any) {
    try {
      const result = await this.ngFireAuth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

  SetUserData(user : any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  async SignOut() {
    await this.ngFireAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}