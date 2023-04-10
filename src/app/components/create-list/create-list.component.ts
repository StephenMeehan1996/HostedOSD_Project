import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbApiServiceService } from 'src/app/services/db-api-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() refreshLists = new EventEmitter();
  message: any;
  
  dateString = '';
  monthAgo = '';
  currentUser: any
  auth: any;
  user$ = this.auth0.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null)));
  profileJson: any;
  name = localStorage.getItem("name");
  constructor(private db : DbApiServiceService, public auth0: AuthService)  { }
 

  createList : FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    creation_date: new FormControl(''),
    user: new FormControl('')
  });

  ngOnInit(): void {
    this.dateString = new Date().toLocaleDateString();
   

    this.auth0.user$.subscribe(
      (profile) => (this.profileJson = JSON.parse(JSON.stringify(profile, null, 2))),
    );

  }

  public CloseCreateList()
{

}

onSubmit(user: string)
{
 
  
  this.createList.controls['creation_date'].setValue(this.dateString);
  this.createList.controls['user'].setValue(this.name);

  this.db.CreateList(this.createList).subscribe({
    next: list => {
      console.log(JSON.stringify(list) + 'list added');
      this.message = "list added";
      this.Close();
      this.refresh();    
       },
    error: (err) => this.message = err
  });



}

public Close()
{
  this.close.emit();

}
public refresh()
{
  this.refreshLists.emit();

}

}


