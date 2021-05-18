import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AdministrarComponent } from './components/administrar/administrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JocComponent } from './components/joc/joc.component';
import {HttpClientModule} from '@angular/common/http';
import { PrincipalComponent } from './components/principal/principal.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { RegistreComponent } from './components/registre/registre.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from './components/nav/nav.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { OrdenarDataPipe } from './pipes/ordenar-data.pipe';
import { OrdenarValoracioPipe } from './pipes/ordenar-valoracio.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { ResetPasswdComponent } from './components/reset-passwd/reset-passwd.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EscriureMissatgeComponent } from './components/escriure-missatge/escriure-missatge.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RessenyaComponent } from './components/ressenya/ressenya.component';
import { CrearRessenyaComponent } from './components/crear-ressenya/crear-ressenya.component';
import { UsuariComponent } from './components/usuari/usuari.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyDNuBsN7Zog741sYCkvrFmFcaIvrGa4A6Q',
  authDomain: 'gamer-forum-c92f2.firebaseapp.com',
  databaseURL: 'https://gamer-forum-c92f2-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'gamer-forum-c92f2',
  storageBucket: 'gs://gamer-forum-c92f2.appspot.com/',
  messagindSenderId: '595084672816'
}

@NgModule({
  declarations: [
    AdministrarComponent,
    JocComponent,
    PrincipalComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistreComponent,
    PaginaPrincipalComponent,
    NavComponent,
    OrdenarDataPipe,
    OrdenarValoracioPipe,
    ResetPasswdComponent,
    PerfilComponent,
    EscriureMissatgeComponent,
    RessenyaComponent,
    CrearRessenyaComponent,
    UsuariComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [PrincipalComponent]
})
export class AppModule { }
