import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieShareApp';

  showSettings = false;
  showManagedList = false;
  showDonate = false;
  profileJson: any;
  message: any;
  user: any;
  

  user$ = this.auth.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null)));
  
  

  isAuthenticated$ = this.auth.isAuthenticated$
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private router: Router){}

  ngOnInit(): void {
  
    // this.auth.user$.subscribe(
    //   (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    //   .next,

    // this.auth.user$.subscribe(
    //   (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    // );


    //   this.auth.user$.subscribe({
    //     next: (profile: any )=> environment.email = profile.nickname,
    //     complete: () => console.log('List service finished ' + this.profileJson[0].name),
    //     error: (mess) => this.message = mess
    //   })
    
    //   this.auth.user$.subscribe({
    //     next: (profile: any )=> environment.picture = profile.picture,
    //     complete: () => console.log('List service finished ' + this.profileJson[0].name),
    //     error: (mess) => this.message = mess
    //   })

    //   this.auth.user$.subscribe({
    //     next: (profile: any )=> environment.role = profile.role,
    //     complete: () => console.log('List service finished ' + this.profileJson[0].name),
    //     error: (mess) => this.message = mess
    //   })

      this.auth.user$.subscribe( _user =>{
        this.user = _user
        console.log(this.user);

        if (this.user['https://localhost:4200/roles'] && this.user['https://localhost:4200/roles'].includes('admin')) {
      
      
        let time = new Date(this.user.updated_at);
        localStorage.setItem("lastLogin", time.toString());
        localStorage.setItem("email", this.user.email);
        localStorage.setItem("name", this.user.nickname);        
        localStorage.setItem("picture", this.user.picture);

        this.router.navigate(['/admin']);
        
      }
     
        localStorage.setItem("email", this.user.email);
        localStorage.setItem("name", this.user.nickname);        
        localStorage.setItem("picture", this.user.picture);

      
      })
     
     

   
  }


  handleLogout() {
    this.auth.logout()
  }
  
  handleLogin() {
 
    this.auth.loginWithRedirect({appState: { target: '/home',}})
  }
 
}
