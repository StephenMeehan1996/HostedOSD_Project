import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-contain',
  templateUrl: './auth-contain.component.html',
  styleUrls: ['./auth-contain.component.css']
})
export class AuthContainComponent implements OnInit {

  constructor() { }

  hasSignedIn = false;
  register = false;
  

  ngOnInit(): void {
  }

  public test()
  {
    this.register = true;
  }

}
