import { Component, OnInit } from '@angular/core';
import { JocsService } from 'src/app/services/jocs.service';
import { Joc } from 'src/app/models/joc.model';
import  { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
  jocs: Joc[];
  jocsData: Joc[];
  jocsValoracio: Joc[];
  iniciNous: number;
  finalNous: number;
  iniciValoracio: number;
  finalValoracio: number;
  constructor(
    private jocsService: JocsService,
    private router: Router
  ) {
    this.iniciNous = 0;
    this.iniciValoracio = 0;
    this.finalNous = 4;
    this.finalValoracio = 4;
   }

  ngOnInit() {
    this.jocsService.getJocs().subscribe(data => {
      this.jocs = data.map(e => {
        return {
         
          ...e.payload.doc.data() as{}
        } as Joc;
      });
      this.jocsData = data.map(e => {
        return {
         
          ...e.payload.doc.data() as{}
        } as Joc;
      });
      this.jocsValoracio = data.map(e => {
        return {
         
          ...e.payload.doc.data() as{}
        } as Joc;
      });
    });
  }

  navegar(nom) {
    this.router.navigateByUrl(`/joc/${nom}`)
  }

  anterior(llista: string) {
    if (llista == 'nous') {
      this.iniciNous-=4;
      this.finalNous-=4;
    } else {
      this.iniciValoracio-=4;
      this.finalValoracio-=4;
    }
  }

  seguent(llista: string) {
    if (llista == 'nous') {
      this.iniciNous+=4;
      this.finalNous+=4;
    } else {
      this.iniciValoracio+=4;
      this.finalValoracio+=4;
    }
  }
}
