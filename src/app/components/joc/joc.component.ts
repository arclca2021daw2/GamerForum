import { Component, OnInit } from '@angular/core';
import { JocsService } from 'src/app/services/jocs.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Joc } from '../../models/joc.model';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarisService } from 'src/app/services/usuaris.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CrearRessenyaComponent } from '../crear-ressenya/crear-ressenya.component';
import { RessenyaComponent } from '../ressenya/ressenya.component';

@Component({
  selector: 'app-joc',
  templateUrl: './joc.component.html',
  styleUrls: ['./joc.component.css']
})
export class JocComponent implements OnInit {

  ressenyaInici: number;
  ressenyaFinal: number;
  ressenyaFeta: boolean;
  ressenyes;
  nota: number;
  usuari;
  valoracioJoc: number;
  urlAPI = '62.210.144.216:3000';
  imatgeActual: number;
  url: any;
  nom: string;
  joc: Joc;
  constructor(
    private _route: ActivatedRoute,
    private jocsService: JocsService,
    private _sanitizer: DomSanitizer,
    private usuariService: UsuarisService,
    private firestore: AngularFirestore,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.imatgeActual = 0;
    this.ressenyaFeta = false;
    this.ressenyes = new Array();
    this.ressenyaInici = 0;
    this.ressenyaFinal = 4;
   }

  ngOnInit() {
    this._route.params.subscribe(async (params: Params) => {
      this.nom = params.nom;
      this.joc = await this.jocsService.getJocByNom(this.nom);

      if(this.joc.num_valoracions > 0) {
        this.valoracioJoc = this.joc.total_valoracions / this.joc.num_valoracions;
      } else {
        this.valoracioJoc = -1;
      }
      
      this.usuari = await this.usuariService.getUsuariByCorreu(JSON.parse(sessionStorage.getItem('user')).email);
      this.firestore.collection('valoracions').ref.doc(`${this.joc.nom}-${this.usuari.correu}`)
      .get().then((doc: any) => {
        if(doc.exists) {
          this.nota = doc.data().nota;
        }
      });

      this.firestore.collection('ressenyes').ref.doc(`${this.usuari.correu}-${this.joc.nom}`)
      .get().then((doc: any) => {
        if (doc.exists) {
          this.ressenyaFeta = true;
        }
      });

      this.firestore.collection('ressenyes').ref.where('joc', '==', this.joc.nom).get().then((query: any) => {
        query.forEach(doc => {
          this.ressenyes.push(doc.data());
        })
      });
    });
  }

  canviarImatge(direccio) {
    if (direccio == 'next') {
      if (this.imatgeActual + 1 == this.joc.imatges.length) {
        this.imatgeActual = 0;
      } else {
        this.imatgeActual++;
      }
    } else {
      if (this.imatgeActual == 0) {
        this.imatgeActual = this.joc.imatges.length - 1;
      } else {
        this.imatgeActual--;
      }
    }
  }

  getVideo(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + url);
  }

  async valorar(e) {
    let nota = parseInt(e.target.id);
    this.joc.total_valoracions+= nota;
    this.joc.num_valoracions++;
    this.jocsService.updateJoc(this.joc);
    await this.firestore.collection('valoracions').doc(`${this.joc.nom}-${this.usuari.correu}`).set({
      nota: nota,
      joc: this.joc.nom
    });
    alert('La teva valoració ha sigut afegida!');
    window.location.reload();
  }

  hover(e) {
    for(let i = e.target.id; i > 0; i--) {
      document.getElementById(i).style.color = 'gold';
    }
  }

  endhover() {
    for(let i = 1; i < 6; i++) {
      document.getElementById(i.toString()).style.color = 'white';
    }
  }

  onTabChanged($event) {
    let index = $event.index;
    if (index == 2) {
      for(let i = this.nota; i > 0; i--) {
        document.getElementById(i.toString()).style.color = 'gold';
      }
    }
  }

  navegarRessenya(usuari: string) {
    this.dialog.open(RessenyaComponent, {
      width: '800px',
      data: {joc: this.joc.nom, usuari: usuari}
    });
  }

  crearRessenya() {
    const dialogRessenya = this.dialog.open(CrearRessenyaComponent, {
      width: '800px',
      data: {joc: this.joc.nom}
    });

    dialogRessenya.afterClosed().subscribe(() => {
      this.ressenyes = new Array();
      this.firestore.collection('ressenyes').ref.where('joc', '==', this.joc.nom).get().then((query: any) => {
        query.forEach(doc => {
          this.ressenyes.push(doc.data());
        })
      });
    })
  }

  anterior() {
    this.ressenyaInici-=4;
    this.ressenyaFinal-=4;
  }

  seguent() {
    this.ressenyaInici+=4;
    this.ressenyaFinal+=4;
  }

  mostrarDescripcio() {
    this.dialog.open(DialogComponent, {
      data: {descripcio: this.joc.descripcio}
    })
  }
}
