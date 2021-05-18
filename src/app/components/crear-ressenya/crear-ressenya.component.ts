import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuari } from 'src/app/models/usuari.model';
import { UsuarisService } from 'src/app/services/usuaris.service';

@Component({
  selector: 'app-crear-ressenya',
  templateUrl: './crear-ressenya.component.html',
  styleUrls: ['./crear-ressenya.component.css']
})
export class CrearRessenyaComponent implements OnInit {

  usuari: Usuari;
  ressenyaForm = this.formBuilder.group({
    titol: ['', Validators.required],
    cos: ['', Validators.required],
    autor: JSON.parse(sessionStorage.getItem('user')).email,
    data: new Date(),
    joc: '',
    nom: ''
  });
  nom: string;
  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private usuariService: UsuarisService,
    public dialogRef: MatDialogRef<CrearRessenyaComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.nom = data.joc;
  }

  async ngOnInit() {
    this.usuari = await this.usuariService.getUsuariByCorreu(JSON.parse(sessionStorage.getItem('user')).email) as Usuari;
    this.ressenyaForm = this.formBuilder.group({
      titol: ['', Validators.required],
      cos: ['', Validators.required],
      autor: JSON.parse(sessionStorage.getItem('user')).email,
      data: new Date(),
      joc: this.nom,
      nom: this.usuari.nom
    })
    this.firestore.collection('ressenyes').ref.doc(`${JSON.parse(sessionStorage.getItem('user')).email}-${this.nom}`)
      .get().then((doc: any) => {
        if (doc.exists) {
          this.ressenyaForm = this.formBuilder.group({
            titol: [doc.data().titol, Validators.required],
            cos: [doc.data().cos, Validators.required],
            autor: JSON.parse(sessionStorage.getItem('user')).email,
            data: new Date(),
            joc: this.nom,
            nom: this.usuari.nom
          });
        }
      })
  }

  crear() {
    if (this.ressenyaForm.valid) {
      this.firestore.collection('ressenyes')
        .doc(`${JSON.parse(sessionStorage.getItem('user')).email}-${this.nom}`).set(this.ressenyaForm.value);
      this.dialogRef.close();
    }
  }
}
