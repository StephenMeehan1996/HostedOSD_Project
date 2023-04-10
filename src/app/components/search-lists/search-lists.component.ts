import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { List } from 'src/app/interfaces/list';
import { Movie } from 'src/app/interfaces/movie';
import { DbApiServiceService } from 'src/app/services/db-api-service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-search-lists',
  templateUrl: './search-lists.component.html',
  styleUrls: ['./search-lists.component.css']
})
export class SearchListsComponent implements OnInit {

  @Input() Lists:List[] = [];
  user: any;
  public movieList:Movie[] = [];
  message: any;
  showList = false;
  title:string = '';

  flag = "lists"

  constructor(private _db : DbApiServiceService) { }

  ngOnInit(): void 
  {
    this.user = localStorage.getItem("name");;


  }

  GetListMovies(list:string, title: string)
  {
    this.showList= true;
   this.title = title;
    this._db.getMovieList(list).subscribe({
      next: (value: Movie[] )=> this.movieList = value,
      complete: () => console.log('movie service finished ' + JSON.stringify(this.movieList)),
      error: (mess) => this.message = mess
    })
    
    return false;
   
  }

  GetList()
  { 
    
  }


}
