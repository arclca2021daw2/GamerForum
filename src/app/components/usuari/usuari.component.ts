import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Usuari } from 'src/app/models/usuari.model';
import { UsuarisService } from 'src/app/services/usuaris.service';

@Component({
  selector: 'app-usuari',
  templateUrl: './usuari.component.html',
  styleUrls: ['./usuari.component.css']
})
export class UsuariComponent implements OnInit {

  edat: number;
  dataActual: Date;
  usuari: Usuari;
  correu: string;
  urlAPI = '62.210.144.216:3000';
  constructor(
    private _route: ActivatedRoute,
    private usuariService: UsuarisService
  ) {
    this.dataActual = new Date();
   }

  ngOnInit(): void {
    this._route.params.subscribe(async (params: Params) => {
      this.correu = params.correu;
      this.usuari = await this.usuariService.getUsuariByCorreu(this.correu);

      let data_naixement = new Date(this.usuari.data_naixement);
      this.edat = this.dataActual.getFullYear() - data_naixement.getFullYear();
      if (this.dataActual.getMonth() < data_naixement.getMonth()) {
        this.edat--;
      }
      if (this.dataActual.getMonth() == data_naixement.getMonth() && this.dataActual.getDay() < data_naixement.getDay()) {
        this.edat--;
      }
    });
  }

}
