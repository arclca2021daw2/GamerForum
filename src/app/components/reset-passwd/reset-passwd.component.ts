import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-passwd',
  templateUrl: './reset-passwd.component.html',
  styleUrls: ['./reset-passwd.component.css']
})
export class ResetPasswdComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
