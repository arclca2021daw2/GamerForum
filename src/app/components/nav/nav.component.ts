import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Joc } from 'src/app/models/joc.model';
import { JocsService } from 'src/app/services/jocs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  jocsFiltrats;
  buscaForm = this.formBuilder.group({
    nom: ''
  });
  jocs: Joc[];
  admin: boolean;
  logged: boolean;
  constructor(
    private aService: AuthService,
    private router: Router,
    private jocsService: JocsService,
    private formBuilder: FormBuilder
  ) { 
    router.events.subscribe(() => {
      if(sessionStorage.getItem('admin') == 'true') {
        this.admin = true;
      } else {
        this.admin = false;
      }

      if(aService.isLoggedIn) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
  }

  ngOnInit() {
    this.jocsService.getJocs().subscribe(data => {
      this.jocs = data.map(e => {
        return {
         
          ...e.payload.doc.data() as{}
        } as Joc;
      })
    });
    this.jocsService.getJocs().subscribe(data => {
      this.jocsFiltrats = data.map(e => {
        return {
         
          ...e.payload.doc.data() as{}
        } as Joc;
      })
    });
  }

  logout() {
    this.aService.SignOut();
  }

  navegar(url) {
    this.router.navigateByUrl(url)
  }
  
  submit() {
    this.router.navigateByUrl(`/joc/${this.buscaForm.value.nom}`)
  }

  filtrar() {
    this.jocsFiltrats = this.jocs.filter(joc => joc.nom.includes(this.buscaForm.value.nom));
  }
}
