import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean  = false;
  userFullName: string ='';
  storage: Storage = sessionStorage;


  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
              private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.authState$.subscribe(
      (res) => {this.isAuthenticated = res;
        console.log(res)
          if(this.isAuthenticated){
            this.getUserDetails();
          }
        }
    )
    
  }

  logout(){
    this.authService.logout();
    this.isAuthenticated = false;

  }

  getUserDetails(){
    this.userFullName = "Ram Lal"
    // fetch the logged in user details

    // this.oktaAuth.getUser().then(
    //   (val)=> {
    //     this.userFullName = val.name as string}
    // )
    const theEmail = "ram.sharma@gmail.com";
    this.storage.setItem("email", theEmail);
  }




}
