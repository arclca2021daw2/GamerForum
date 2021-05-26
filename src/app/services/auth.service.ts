import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Usuari } from '../models/usuari.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor(
    public afs: AngularFirestore,   
    public afAuth: AngularFireAuth, 
    public router: Router,  
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        delete this.userData.passwd;
        sessionStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(sessionStorage.getItem('user'));
      } else {
        sessionStorage.setItem('user', null);
        JSON.parse(sessionStorage.getItem('user'));
      }
    })
   }

  signIn(email, password) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(result => {
      this.SetUserData(result.user);
    }).then(() => {
      this.afs.collection<Usuari>('usuaris', ref => ref.where('correu', '==', email).limit(1))
      .snapshotChanges().subscribe(data => {
        if(data[0].payload.doc.data().admin) {
          sessionStorage.setItem('admin', 'true');
        } else {
          sessionStorage.setItem('admin', 'false');
        }
        this.router.navigate(['']);
      })
    }).catch(error => {
      alert(error.message)
    });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usersAuth/${user.email}`);
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

  SignOut() {
    return this.afAuth.signOut().then(() => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('admin');
      this.router.navigate(['login']);
    })
  }

  async SignUp(email: string, password: string) {
    let correcte = true;
    await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.router.navigate(['login']);
      }).catch((error) => {
        window.alert(error.message)
        correcte = false;
      });
    return correcte;
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('S\'ha enviat un correu per a recuperar la contrasenya.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  get isAdmin(): boolean {
    const admin = JSON.parse(sessionStorage.getItem('admin'));
    return (admin) ? true : false;
  }
}
