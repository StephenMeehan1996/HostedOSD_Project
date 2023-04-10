import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { List, ListItem } from 'src/app/interfaces/list';
import { DbApiServiceService } from 'src/app/services/db-api-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-lists',
  templateUrl: './manage-lists.component.html',
  styleUrls: ['./manage-lists.component.css']
})
export class ManageListsComponent implements OnInit {

  public Lists:List[] = [];
  infoArray: any;
  tempList: any;
  errorMessage: any
  showEditForm = false;

  formError = false;
  formErrorMessage = ''
  message: any;



  date = new Date().toDateString;
  

  ListForm = new FormGroup({
    list: new FormControl('', Validators.required),
    action: new FormControl('', Validators.required),
  
  });


  
  constructor(private _movieService: DbApiServiceService) { }
//{{currentDate | date:'yyyy-MM-dd'}}

  ngOnInit(): boolean {
    this._movieService.getLists("user").subscribe({
      next: (value: List[] )=> this.Lists = value,
      complete: () => console.log('List service finished ' + this.Lists[0].title),
      error: (mess) => this.message = mess
    })
    
    return false;
  }

  submit()
  {
    if(this.ListForm.value.list == '')
    {
      this.formError = true;
      this.formErrorMessage = "Please Select list"
    }

    else if (this.ListForm.value.action == '')
    {
      this.formError = true;
      this.formErrorMessage = "Please Select Action"
    }
    else
    {
      console.log(this.ListForm.value);
      // split string here to get three values passed back
      //work around
      let s = this.ListForm.value.list?.toString();
      this.infoArray = s?.split('~');
      
      if(this.ListForm.value.action == "Edit")
      {
        this.showEditForm = true;
      }
      else
      {
        this.deleteList(this.infoArray[0])
      }
    }

   

  }

  UpdateListItem(title: string, desc: string)
  {
    this.tempList = new ListItem(title, desc, this.infoArray[3], environment.email);
    this._movieService.updateList(this.infoArray[0], this.tempList).subscribe({
      next: list => {
        console.log(JSON.stringify(list) + 'list added');
        this.message = "list added";
        this.ngOnInit()    
         },
      error: (err) => this.message = err
    });

    this.showEditForm = false;

   

    return false;

  
  }

 
  deleteList(list: any)
  {
    this._movieService.DeleteList(list).subscribe({
      next: l => {
        console.log(JSON.stringify(l) + 'list added');
        this.message = "list added";
        this.ngOnInit()    
         },
      error: (err) => this.message = err
    });

 
  }

  turnFalse()
  {
    this.formError = false;
    this.showEditForm = false;
  }

 

}
