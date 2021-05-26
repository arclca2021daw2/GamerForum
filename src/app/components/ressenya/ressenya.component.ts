import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuari } from 'src/app/models/usuari.model';

@Component({
  selector: 'app-ressenya',
  templateUrl: './ressenya.component.html',
  styleUrls: ['./ressenya.component.css']
})
export class RessenyaComponent implements OnInit {

  usuari: Usuari;
  ressenya;
  joc: string;
  usuariCorreu: string;
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public dialogRef: MatDialogRef<RessenyaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private ngZone: NgZone
  ) {
    this.joc = data.joc;
    this.usuariCorreu = data.usuari;
  }

  ngOnInit(): void {
    this.firestore.collection('ressenyes').ref.doc(`${this.usuariCorreu}-${this.joc}`).get().then(doc => {
      this.ressenya = doc.data();
    });

    this.firestore.collection('usuaris').ref.doc(this.usuariCorreu).get().then(doc => {
      this.usuari = doc.data() as Usuari;
    })
  }

  navegar() {
    this.dialogRef.close();
    this.router.navigateByUrl(`/usuari/${this.usuari.nom}`);
  }
}
