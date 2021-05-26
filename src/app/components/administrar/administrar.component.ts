import { Component, OnInit } from '@angular/core';
import { JocsService } from 'src/app/services/jocs.service';
import { Joc } from 'src/app/models/joc.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

  url = '62.210.144.216:3000';
  displayedColumns: string[] = ['nom', 'data_afegit',
    'desenvolupador', 'web', 'preu', 'esborrar'];
  missatges;
  imgs: string[];
  portada: string;
  plataformes: string[];
  jocs: Joc[];
  missatgeActual: number;
  resposta: string;
  llistaPlataformes;
  llistaCategories;
  checkoutForm = this.formBuilder.group({
    nom: ['', Validators.required],
    plataformes: [[], Validators.required],
    categories: [[], Validators.required],
    data_llansament: ['', Validators.required],
    desenvolupador: ['', Validators.required],
    descripcio: ['', Validators.required],
    web: ['', Validators.required],
    preu: [0, Validators.required],
    video: ['', Validators.required]
  });
  respostaForm = this.formBuilder.group({
    resposta: ['', Validators.required]
  })
  constructor(
    private jocsService: JocsService,
    private formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    private firestore: AngularFirestore,
    private router: Router,
    private http: HttpClient
  ) {
    this.imgs = new Array();
    this.portada = '';
    this.missatges = new Array();
    this.missatgeActual = 0;
    this.resposta = '';
  }

  ngOnInit() {
    this.jocsService.getJocs().subscribe(data => {
      this.jocs = data.map(e => {
        return {
         
          ...e.payload.doc.data() as {}
        } as Joc;
      })
    });

    this.firestore.collection('missatges').ref.where('resposta', '==', '')
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.missatges.push(doc.data());
        });
      });

    this.http.get(`http://${this.url}/plataformes`).subscribe(plataformes => this.llistaPlataformes = plataformes);
    this.http.get(`http://${this.url}/categories`).subscribe(categories => this.llistaCategories = categories);
  }

  async create(joc: Joc) {
    joc.total_valoracions = 0;
    joc.num_valoracions = 0;
    joc.data_afegit = new Date();
    let task = this.afStorage.upload(`/imgs/portades/${joc.nom}`, this.portada);
    (await task).ref.getDownloadURL().then(url => {
      joc.portada = url;
    }).then(async () => {
      if (this.imgs.length > 0) {
        joc.imatges = new Array();
        this.imgs.forEach(async (img, i) => {
          let pujada = this.afStorage.upload(`/imgs/jocs/${joc.nom}-${i}`, img);
          (await pujada).ref.getDownloadURL().then(url => {
            joc.imatges.push(url);
          }).then(() => {
            if (i == this.imgs.length - 1) {
              setTimeout(() => this.jocsService.createJoc(joc), 2000);
            }
          });
        });
      } else {
        this.jocsService.createJoc(joc);
      }
      alert('Joc creat');
    }).catch(e => {
      console.log(e);
    });

  }

  update(joc: Joc) {
    this.jocsService.updateJoc(joc);
  }

  delete(index: number) {
    let joc = this.jocs[index];
    this.jocsService.deleteJoc(joc.nom);
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const ref = this.firestore.collection('jocs').ref.doc(this.checkoutForm.value.nom);

      ref.get()
        .then(doc => {
          if (!doc.exists) {
            this.create(this.checkoutForm.value);
            this.checkoutForm.reset();
          } else {
            alert('Aquest joc ja existeix!');
          }
        });
    }
  }

  pujarPortada() {
    let inputFile = document.createElement('input');
    inputFile.type = 'file';

    inputFile.onchange = async (e: any) => {
      this.portada = e.target.files[0];
    }

    inputFile.click();
  }

  pujarImgs() {
    let inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.setAttribute('multiple', '');

    inputFile.onchange = async (e: any) => {
      this.imgs = new Array();
      for (let i = 0; i < e.target.files.length; i++) {
        this.imgs.push(e.target.files[i]);
      }
    }

    inputFile.click();
  }

  canviarMissatge(direccio) {
    if (direccio == 'anterior') {
      this.missatgeActual--;
    } else {
      this.missatgeActual++;
    }
  }

  respondre() {
    if(this.respostaForm.valid) {
      let missatge = this.missatges[this.missatgeActual];
      missatge.resposta = this.respostaForm.value.resposta;
      this.firestore.doc('missatges/' + missatge.autor).update(missatge);
      this.missatges.splice(this.missatgeActual, 1);
      this.respostaForm.reset();
    }
  }

  navegar(nom) {
    this.router.navigateByUrl(`joc/${nom}`);
  }
}
