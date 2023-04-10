import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/interfaces/list';
import { Movie } from 'src/app/interfaces/movie';
import { DbApiServiceService } from 'src/app/services/db-api-service.service';
import { MovieApiServiceService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

 
  errorMessage:any;

  showpage = false;
  showList = false;
 

  public Lists:List[] = [];
  public movieData:any;

  message: any;

  discover = false;

  flag = "search"

  constructor(private _movieService: MovieApiServiceService, private _APIService: DbApiServiceService) { }

  ngOnInit(): void {
  }



  public Search(search: string, page: number)
  {
    this.showpage = true;
    this.showList = false;
 

    this._movieService.getData(search, page).subscribe(
      m =>{
        this.movieData = m
        console.log(JSON.stringify(this.movieData))
     
    })

    return false;
  }

  public SearchLists()
  {
    this.showpage = false;
    this.showList = true;

    this._APIService.getLists("all").subscribe({
      next: (value: List[] )=> this.Lists = value,
      complete: () => console.log('List service finished ' + this.Lists[0].title),
      error: (mess: any) => this.message = mess
    })

  }

  displayLists()
  {
    
  }

  displayDiscover()
  {
    this.discover =! this.discover;

  }
}
