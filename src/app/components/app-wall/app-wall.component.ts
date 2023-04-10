import { Component, OnInit } from '@angular/core';
import { Movie,MovieItem, MovieTestingItem } from 'src/app/interfaces/movie';
import { DbApiServiceService } from 'src/app/services/db-api-service.service';
import { MovieApiServiceService } from 'src/app/services/movie-api-service.service';
import { List, ListItem } from 'src/app/interfaces/list';
import { DecimalPipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Cast, Crew } from 'src/app/interfaces/cast';


@Component({
  selector: 'app-app-wall',
  templateUrl: './app-wall.component.html',
  styleUrls: ['./app-wall.component.css']
})
export class AppWallComponent implements OnInit {

 public movieList:Movie[] = [];
 public Lists:List[] = [];
 public cast:Cast[] = [];
 public crew:Crew[] = [];
  errorMessage: any;
  message: any
  displaySide = false
  clickedDetail = false;
  showCreateList = false;  
  hasSearched = false;
 formError = false;
 displayComments = false;

 flag = 'home';

 email = localStorage.getItem("email");
  picture = localStorage.getItem("picture");
  name = localStorage.getItem("name");
  
  constructor(private _movieService: DbApiServiceService, private _ApiService: MovieApiServiceService) { }

  ngOnInit(){
    // set details 
   this.GetList();
  
   
  
  }

  getDetails(m:Movie)
  {
    this._ApiService.getCast(m.imdb_id).subscribe(
      c =>{
        this.cast = c.cast;
        this.crew = c.crew;
        console.log(JSON.stringify(this.crew));
     
        
      })

 

    m.showDetail = true;
  }

  GetList()
  {  
    this._movieService.getLists("user").subscribe({
      next: (value: List[] )=> this.Lists = value,
      complete: () => console.log('List service finished ' + this.Lists[0].title),
      error: (mess) => this.message = mess
    })
    
    return false;
  }
  refreshMovies(list: string) {
   this.getMovies(list);
  }

  getMovies(list: string): boolean
  {
 
    this.hasSearched = true;
    this._movieService.getMovieList(list).subscribe({
      next: (value: Movie[] )=> this.movieList = value,
      complete: () => console.log('movie service finished ' + this.movieList[0].title),
      error: (mess) => this.message = mess
    })
    
    return false;

  }
  UpdateItem(m: Movie, newRating: string, newNote: string, id: string, list: string)
  {
    let num = Number(newRating)
    if(num > 10 || num < 0 )
    {
      this.formError = true;
      return;

    }
    else
    {
       
     let numobject = JSON.stringify(m.vote_average).toString();
     let ratingAsString = numobject.slice(19, 22)
    let tempItem = new MovieItem(m.title, m.imdb_id, m.overview, m.poster_path, m.release_date, Number(ratingAsString),m.vote_count, newNote, Number(newRating), m.listID, environment.email);
    
    this._movieService.UpdateItem(tempItem, id).subscribe({
      next: movie => {
        console.log(JSON.stringify(movie) + 'movie added');
        this.message = "movie added";
         this.getMovies(list);     
         },
      error: (err) => this.message = err
    });

   
  }

  }

  deleteItem(id:string, list: string)
  {
    this._movieService.DeleteItem(id).subscribe({
      next: movie => {
        console.log(JSON.stringify(movie) + 'movie added');
        this.message = "movie added";
         this.getMovies(list);     
         },
      error: (err) => this.message = err
    });
  }

    
  viewDetails(m : Movie)
  {
    m.showDetail = ! m.showDetail;

  }

  showEditDetails(m : Movie)
  {
    
    m.showEditDetail = ! m.showEditDetail;

  }

  closeCreateList()
  {
    
   this.showCreateList = ! this.showCreateList;

  }

  getFilteredRating(rating: string, list: string)
  {
    this.hasSearched = true;
    this._movieService.FilterbyRating(Number(rating), list).subscribe({
      next: (value: Movie[] )=> this.movieList = value,
      complete: () => console.log('movie service finished ' + this.movieList[0].title),
      error: (mess) => this.message = mess
    })
    


  
    return false;

    

  }

  


  DisplayComments()
  {
    this.displayComments =! this.displayComments;
  }


}


export function  viewDetails(m : MovieTestingItem)
{
  m.showDetail = ! m.showDetail;

}

