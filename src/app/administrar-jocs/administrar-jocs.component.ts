import { Component, OnInit } from '@angular/core';
import { JocsService } from 'src/app/jocs.service';
import { Joc } from 'src/app/joc.model';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-administrar-jocs',
  templateUrl: './administrar-jocs.component.html',
  styleUrls: ['./administrar-jocs.component.css']
})
export class AdministrarJocsComponent implements OnInit {

  plataformes: string[];
  jocs: Joc[];
  checkoutForm = this.formBuilder.group({
    nom: '',
    plataformes: [],
    categories: [],
    data_llansament: '',
    desenvolupador: '',
    descripcio: '',
    web: '',
    portada: '',
    imatges: [],
    preu: 0
  });
  constructor(
    private jocsService: JocsService,
    private formBuilder: FormBuilder,
    private afStorage: AngularFireStorage
    ) { }

  ngOnInit() {
    this.jocsService.getJocs().subscribe(data => {
      this.jocs = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as{}
        } as Joc;
      })
    });

    let ref = this.afStorage.ref('plataformes.json');
    ref.getDownloadURL();
  }

  create(joc: Joc){
    this.jocsService.createJoc(joc);
  }

  update(joc: Joc) {
    this.jocsService.updateJoc(joc);
  }

  delete(id: string) {
    this.jocsService.deleteJoc(id);
  }

  onSubmit(): void {
    this.create(this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
