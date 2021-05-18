import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Joc } from 'src/app/models/joc.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class JocsService {

  constructor(
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage
    ) { }

  getJocs() {
    return this.firestore.collection('jocs').snapshotChanges();
  }

  async getJocByNom(nom: string) {
    let data;
    await this.firestore.collection('jocs').ref.doc(nom).get().then(doc => {
      data = doc.data();
    });
    return data;
  }

  createJoc(joc: Joc) {
    return this.firestore.collection('jocs').doc(joc.nom).set(joc);
  }

  updateJoc(joc: Joc) {
    this.firestore.doc('jocs/' + joc.nom).update(joc);
  }

  deleteJoc(nom: string) {
    this.getJocByNom(nom).then(joc => {
      this.afStorage.ref(`imgs/portades/${nom}`).delete();
      if(joc.imatges) {
        for(let i = 0; i <= joc.imatges.length; i++) {
          this.afStorage.ref(`imgs/jocs/${nom}-${i}`).delete();
        }
      }
      this.firestore.collection('valoracions').ref.where('joc', '==', nom).get().then(query => {
        query.forEach(doc => {
          doc.ref.delete();
        });
      });
      this.firestore.collection('ressenyes').ref.where('joc', '==', nom).get().then(query => {
        query.forEach(doc => {
          doc.ref.delete();
        });
      });
      this.firestore.collection('jocs').doc(nom).delete();
    });
    
  }
}
