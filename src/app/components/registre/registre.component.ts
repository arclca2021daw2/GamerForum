import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarisService } from '../../services/usuaris.service';
import { Usuari } from '../../models/usuari.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {
  
  nomsUsuaris: string[];
  foto_perfil: string;
  registreForm = this.formBuilder.group({
    nom: ['', Validators.required],
    correu: ['', Validators.required],
    passwd: ['', Validators.required],
    data_naixement: ['', Validators.required],
    biografia: ['', Validators.required],
    data_registre: new Date(),
    sexe: ['', Validators.required]
  });
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public usersService: UsuarisService,
    private afStorage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {
    this.foto_perfil = null;
    this.nomsUsuaris = new Array();
  }

  ngOnInit(): void { 
    this.usersService.getUsuaris().subscribe(data => {
      data.map(e => {
        let usuari = e.payload.doc.data() as Usuari;
        this.nomsUsuaris.push(usuari.nom);
      })
    })
  }

  async create(usuari: Usuari) {
    if (this.foto_perfil != null) {
      let task = this.afStorage.upload(`/imgs/usuaris/${this.registreForm.value.correu}`, this.foto_perfil);
      (await task).ref.getDownloadURL().then(url => {
        usuari.foto_perfil = url;
        usuari.admin = false;
      }).then(() => {
        this.usersService.createUsuari(usuari);
      })
    } else {
      usuari.admin = false;
      this.usersService.createUsuari(usuari);
    }
  }

  pujarFoto(e) {
    this.foto_perfil = e.target.files[0];
  }

  async registre() {
    if (this.registreForm.valid) {
      let existeix = false;
      this.nomsUsuaris.forEach(us => {
        if(this.registreForm.value.nom == us) {
          existeix = true;
        }
      });
      if (!existeix) {
      const ref = this.firestore.collection('usuaris').ref.doc(this.registreForm.value.correu);

      ref.get()
        .then(async (doc) => {
          if (!doc.exists) {
            let correcte = await this.authService.SignUp(this.registreForm.value.correu, this.registreForm.value.passwd);
            if (correcte) {
              this.create(this.registreForm.value);
            }
          } else {
            alert('Ja hi ha un usuari amb aquest correu!');
          }
        });
      } else {
        alert('Ja hi ha un usuari amb aquest nom!');
      }
    }
  }
}
