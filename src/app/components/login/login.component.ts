import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuari } from 'src/app/models/usuari.model';
import { UsuarisService } from 'src/app/services/usuaris.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    correu: ['', Validators.required],
    passwd: ['', Validators.required]
  })
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.authService.SignOut();
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value.correu, this.loginForm.value.passwd)
    }
  }
}
