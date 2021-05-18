import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuari } from 'src/app/models/usuari.model';
import { UsuarisService } from 'src/app/services/usuaris.service';
import { EscriureMissatgeComponent } from '../escriure-missatge/escriure-missatge.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {

  perfilForm;
  teMissatge: boolean;
  usuari: Usuari;
  missatge: Object;
  constructor(
    private usuarisService: UsuarisService,
    private formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    private firestore: AngularFirestore,
    private dialog: MatDialog
  ) {
    this.firestore.collection('missatges').doc(JSON.parse(sessionStorage.getItem('user')).email).ref.get()
      .then(async doc => {
        if (doc.exists) {
          this.teMissatge = true;
          this.missatge = doc.data();
        } else {
          this.teMissatge = false;
        }
      });
  }

  async ngOnInit() {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    let email = userInfo.email;
    this.usuari = await this.usuarisService.getUsuariByCorreu(email);
    this.perfilForm = this.formBuilder.group({
      data_naixement: [this.usuari.data_naixement, Validators.required],
      biografia: [this.usuari.biografia, Validators.required],
      sexe: this.usuari.sexe,
    });
  }

  guardar() {
    if (this.perfilForm.valid) {
      this.usuari.data_naixement = this.perfilForm.value.data_naixement;
      this.usuari.biografia = this.perfilForm.value.biografia;
      this.usuari.sexe = this.perfilForm.value.sexe;
      this.usuarisService.updateUsuari(this.usuari);
      alert('Perfil modificat!');
    }
  }

  canviarFoto() {
    let inputFile = document.createElement('input');
    inputFile.type = 'file';

    inputFile.onchange = async (e: any) => {
      let img = e.target.files[0];
      this.afStorage.ref(`imgs/portades/${this.usuari.correu}`).delete();
      let task = this.afStorage.upload(`/imgs/usuaris/${this.usuari.correu}`, img);
      (await task).ref.getDownloadURL().then(url => {
        this.usuari.foto_perfil = url;
        this.usuarisService.updateUsuari(this.usuari);
      });
    }

    inputFile.click();
  }

  novaFoto() {
    let inputFile = document.createElement('input');
    inputFile.type = 'file';

    inputFile.onchange = async (e: any) => {
      let img = e.target.files[0];
      let task = this.afStorage.upload(`/imgs/usuaris/${this.usuari.correu}`, img);
      (await task).ref.getDownloadURL().then(url => {
        this.usuari.foto_perfil = url;
        this.usuarisService.updateUsuari(this.usuari);
      });
    }

    inputFile.click();
  }

  enviarMissatge() {
    const dialogRessenya = this.dialog.open(EscriureMissatgeComponent, {
      width: '800px',
    });

    dialogRessenya.afterClosed().subscribe(() => {
      this.firestore.collection('missatges').doc(JSON.parse(sessionStorage.getItem('user')).email).ref.get()
        .then(async doc => {
          if (doc.exists) {
            this.teMissatge = true;
            this.missatge = doc.data();
          } else {
            this.teMissatge = false;
          }
        })
    });
  }
}
