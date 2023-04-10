import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbApiServiceService } from 'src/app/services/db-api-service.service';
import { DOCUMENT } from '@angular/common';
import { JwtDecodeOptions } from 'jwt-decode';
import jwt_decode from "jwt-decode";


import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private db : DbApiServiceService, @Inject(DOCUMENT) public document: Document, public auth: AuthService, 
  ) { }
  @Output() registerEvent = new EventEmitter();

  loginForm : FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  profileJson: any;
  test: any;
  token = '';


  ngOnInit(): void {
     this.auth.getIdTokenClaims().subscribe((claims) => {
     let token = ''+claims?.__raw;
     console.log("User Token - ", token);
     const decodedToken: any = jwt_decode(token);
      console.log("User Token Decoded - ", decodedToken);
     if (decodedToken['https://localhost:4200/roles'] && decodedToken['https://localhost:4200/roles'].includes('admin')) {
      
      alert("User is admin");
      
    } else {
      
      console.log("User is not admin");
    
    console.log('Decoded Token:', decodedToken['https://localhost:4200/roles']);
      
      }
      
  })
      
   
  }

  // onSubmit()
  // {
  //   console.table(this.loginForm.value);

  //   this.db.LoginUser(this.loginForm);

  // }

  // public register()
  // {
  //   this.registerEvent.emit();

  // }

  isAuthenticated$ = this.auth.isAuthenticated$
 

  handleLogout() {
    this.auth.logout()
  }
  
  handleLogin() {
 
    this.auth.loginWithRedirect({appState: { target: '/home',}});
    this.auth.user$.subscribe(user => {
      // if (this.auth.hasRole('admin')) {
      //   // user has the "admin" role, grant them access
      // } else {
      //   // user does not have the "admin" role, deny access
      // }
      this.test = user; 
 
      console.log(JSON.stringify(this.test));

    });
  

    

   

  }

  handleSignUp() {
    this.auth.loginWithRedirect({screen_hint:"signup"})
  }
}
