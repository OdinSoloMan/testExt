import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  Url = 'https://localhost:5001';
  constructor(public http: HttpClient) {}
  SignIn(email: any, password: any) {
    const data = {
      Email: email,
      Password: password,
      RememberMe: true,
    };
    return this.http.post<any>(this.Url + '/account/login', data);
  }

  PasswordRecoverMessageEmail(passwordResetEmail: any) {
    return this.http.post<any>(
      this.Url + '/account/reset-password-msg-email',
      passwordResetEmail
    );
  }

  SwitchPassowd(data: any) {
    return this.http.post<any>(this.Url + '/account/reset-psw', data);
  }

  ConfirmEmail(userId: string, code: string) {
    return this.http.get<any>(
      this.Url + '/account?userId=' + userId + '&code=' + code
    );
  }

  RegisterUser(data: any) {
    return this.http.post<any>(this.Url + '/account/register', data);
  }

  // userData: any;

  // constructor(
  //   public afStore: AngularFirestore,
  //   public ngFireAuth: AngularFireAuth,
  //   public router: Router,
  //   public ngZone: NgZone
  // ) {
  //   ngFireAuth.authState.subscribe((user) => {
  //     if (user) {
  //       this.userData = user;
  //       localStorage.setItem('user', JSON.stringify(this.userData));
  //       JSON.parse(localStorage.getItem('user'));
  //     } else {
  //       // localStorage.setItem('user', null);
  //       // JSON.parse(localStorage.getItem('user'));
  //     }
  //   });
  // }

  // SignIn(email: any, password: any) {
  //   return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  // }

  // RegisterUser(email: any, password: any) {
  //   return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  // }

  // async SendVerificationMail() {
  //   return (await this.ngFireAuth.currentUser)
  //     .sendEmailVerification()
  //     .then(() => {
  //       this.router.navigate(['verify-email']);
  //     });
  // }

  // async PasswordRecover(passwordResetEmail: any) {
  //   try {
  //     await this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail);
  //     window.alert(
  //       'Password reset email has been sent, please check you inbox.'
  //     );
  //   } catch (error) {
  //     window.alert(error);
  //   }
  // }

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return user !== null && user.emailVerified !== false ? true : false;
  // }

  // get isEmailVerified(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return user.emailVerified !== false ? true : false;
  // }

  // GoogleAuth() {
  //   this.AuthLogin();
  // }

  // async AuthLogin() {
  //   var t: any;
  //   try {
  //     const auth = getAuth();
  //     const result = await this.ngFireAuth.signInWithPopup(new GoogleAuthProvider())
  //     .then((result: any) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       this.SetUserData(user);
  //       // ...
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  //     this.ngZone.run(() => {
  //       this.router.navigate(['home']);
  //     });
  //   } catch (error) {
  //     window.alert(error);
  //   }
  // }

  // SetUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }

  // async SignOut() {
  //   await this.ngFireAuth.signOut();
  //   localStorage.removeItem('user');
  //   this.router.navigate(['login']);
  // }
}
