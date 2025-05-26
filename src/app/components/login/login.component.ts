import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from 'src/app/config/my-app-config';
import { AuthService } from 'src/app/service/auth.service';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router,  private dialogRef: MatDialogRef<LoginComponent>,) {}

  ngOnInit(){

  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response);
        this.router.navigate(['/products']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
        console.log(this.errorMessage);
      },
    });


  }




 

}
