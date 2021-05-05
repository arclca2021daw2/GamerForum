import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuari } from 'src/app/usuari.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarisService {
  constructor(private firestore: AngularFirestore) { }

  getUsuaris() {
    return this.firestore.collection('usuaris').snapshotChanges();
  }

  createUsuari(usuari: Usuari) {
    return this.firestore.collection('usuaris').add(usuari);
  }

  updateUsuari(usuari: Usuari) {
    delete usuari.id;
    this.firestore.doc('usuaris/' + usuari.id).update(usuari);
  }

  deleteUsuari(usuariId: string) {
    this.firestore.doc('usuaris/' + usuariId).delete();
  }
}
