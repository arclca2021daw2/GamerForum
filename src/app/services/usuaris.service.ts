import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuari } from 'src/app/models/usuari.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarisService {
  constructor(private firestore: AngularFirestore) { }

  getUsuaris() {
    return this.firestore.collection('usuaris').snapshotChanges();
  }

  async getUsuariByCorreu(correu: string) {
    let data;
    await this.firestore.collection('usuaris').ref.doc(correu).get().then(doc => {
      data = doc.data();
    });
    return data;
  }

  async getUsuariByNom(nom: string) {
    let usuari;
    await this.firestore.collection('usuaris').ref.where('nom', '==', nom).get().then(query => {
      query.forEach(doc => {
        usuari = doc.data();
      })
    })
    return usuari;
  }

  createUsuari(usuari: Usuari) {
    delete usuari.passwd;
    return this.firestore.collection('usuaris').doc(usuari.correu).set(usuari);
  }

  updateUsuari(usuari: Usuari) {
    this.firestore.doc('usuaris/' + usuari.correu).update(usuari);
  }

  deleteUsuari(usuariId: string) {
    this.firestore.doc('usuaris/' + usuariId).delete();
  }
}
