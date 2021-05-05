import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AdministrarJocsComponent } from './administrar-jocs/administrar-jocs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    AppComponent,
    AdministrarJocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AdministrarJocsComponent]
})
export class AppModule { }
