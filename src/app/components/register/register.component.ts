import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { DbApiServiceService } from 'src/app/services/db-api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm : FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('',  [Validators.email]),
    password: new FormControl('', [Validators.required]),
    roles : new FormControl('["admin","edit"]')
  });

  constructor(private db : DbApiServiceService) { }

  onSubmit()
  {
    console.table(this.registerForm.value);
    this.db.RegistorUser(this.registerForm);
  


  }

  

  ngOnInit(): void {
  }

}
