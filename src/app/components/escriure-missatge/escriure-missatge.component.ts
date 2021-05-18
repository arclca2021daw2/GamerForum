import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-escriure-missatge',
  templateUrl: './escriure-missatge.component.html',
  styleUrls: ['./escriure-missatge.component.css']
})
export class EscriureMissatgeComponent implements OnInit {

  correu: string;
  missatgeForm = this.formBuilder.group({
    titol: ['', Validators.required],
    cos: ['', Validators.required],
    autor: JSON.parse(sessionStorage.getItem('user')).email,
    data: new Date(),
    resposta: ''
  })
  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<EscriureMissatgeComponent>,
  ) {
    this.correu = JSON.parse(sessionStorage.getItem('user')).email;
  }

  ngOnInit(): void {
  }

  enviar() {
    if (this.missatgeForm.valid) {
      this.firestore.collection('missatges').doc(this.correu).ref.get()
        .then(doc => {
          if (doc.exists) {
            this.firestore.collection('missatges').doc(this.correu).delete();
            this.firestore.collection('missatges').doc(this.correu).set(this.missatgeForm.value);
          } else {
            this.firestore.collection('missatges').doc(this.correu).set(this.missatgeForm.value);
          }
        }).then(() => {
          this.dialogRef.close();
        });
    }
  }
}
