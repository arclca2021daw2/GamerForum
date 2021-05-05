import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Joc } from 'src/app/joc.model';

@Injectable({
  providedIn: 'root'
})
export class JocsService {

  constructor(private firestore: AngularFirestore) { }

  getJocs() {
    return this.firestore.collection('jocs').snapshotChanges();
  }

  createJoc(joc: Joc) {
    return this.firestore.collection('jocs').add(joc);
  }

  updateJoc(joc: Joc) {
    delete joc.id;
    this.firestore.doc('jocs/' + joc.id).update(joc);
  }

  deleteJoc(jocId: string) {
    this.firestore.collection('jocs').doc(jocId).delete();
  }
}
