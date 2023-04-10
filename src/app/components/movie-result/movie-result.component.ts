import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItem } from 'src/app/interfaces/list';
import { Movie, MovieItem } from 'src/app/interfaces/movie';
import { DbApiServiceService } from 'src/app/services/db-api-service.service';
import { MovieApiServiceService } from 'src/app/services/movie-api-service.service';
import { List } from 'src/app/interfaces/list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Crew } from 'src/app/interfaces/cast';



@Component({
  selector: 'app-movie-result',
  templateUrl: './movie-result.component.html',
  styleUrls: ['./movie-result.component.css']
})
export class MovieResultComponent implements OnInit {

  details = false;
  menu = false;

  badForm = false;
  formErrorMessage = '';
  public crew:Crew[] = [];
  
  
  public Lists:List[] = [];
  message: any;
  errorMessage: any;
  @Input() list: any

  displayComments : boolean;

  @Input() movie?: any;
  @Input() flag?: any;


  @Output() newItemEvent = new EventEmitter<string>();

  imageError: false;
  formError = false;
  name = localStorage.getItem("name");

  //rating.value, note.value, list.value
//(click)="AddMovietoList(movie, rating.value, note.value, list.value)"
  addMovie : FormGroup = new FormGroup({
    rating: new FormControl(this.movie?.rating, [Validators.required]),
    note: new FormControl(this.movie?.note, [Validators.required]),
    list: new FormControl(this.movie?.list)
  });


  constructor(private _db : DbApiServiceService,private _ApiService: MovieApiServiceService,private _movieService: DbApiServiceService) { }

  ngOnInit(): void {
    this.GetList();
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  onSubmit(movie : any)
  {
    console.table(this.addMovie?.value);
    let rating = this.addMovie.controls['rating'].value;
    let list = this.addMovie.controls['list'].value;
    let note = this.addMovie.controls['note'].value;


    let numRating = Number(rating);

    // this validation is working by testing the value isnt "List", Unable to 
   // see if this is possible to do with reactive forms validators
    if(list == "Lists") // default selection
    {
      this.badForm = true;
      this.formErrorMessage = "Please select a List"
      return;

    }
    else if(numRating > 10 || numRating < 0)
    {
      this.badForm = true;
      this.formErrorMessage = "Rating has to be between 1 and 10"
      return;
    }

    else
    {
      // handled if note and rating are blank, 
      // list must be selected
      // rating if present must be between 1-10

    if(rating == "")
    {
      rating = "0";
    }
    if(note == "")
    {
      note = "no note added yet"
    }

      let tempItem = new MovieItem(movie.title, movie.id, movie.overview, movie.poster_path,
      movie.release_date, movie.vote_average, movie.vote_count, note, Number(rating), list, "test");

      console.log(JSON.stringify(tempItem));

      this.details = false;
      this.menu = false;
     
      
     this._db.addMovie(tempItem);
    }


  }

  GetList()
  {
    this._db.getLists("user").subscribe({
      next: (value: List[] )=> this.Lists = value,
      complete: () => console.log('List service finished ' + this.Lists[0].title),
      error: (mess) => this.message = mess
    })
    
    
    return false;
  }

  viewDetails(id: string)
  {
    
    this._ApiService.getCast(Number(id)).subscribe(
      c =>{
       
        this.crew = c.crew;
        console.log(JSON.stringify(this.crew));
     
        
      })


    this.details = ! this.details;

  }
  addMenu()
  {
    this.menu = ! this.menu;
    this.badForm = false;

  }
  DisplayComments()
  {
    this.displayComments =! this.displayComments;
  }

  showEditDetails(m : Movie)
  {
    
    m.showEditDetail = ! m.showEditDetail;

  }

  UpdateItem(m: Movie, newRating: string, newNote: string, id: string)
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
    let tempItem = new MovieItem(m.title, m.imdb_id, m.overview, m.poster_path, m.release_date, Number(ratingAsString),m.vote_count, newNote, Number(newRating), m.listID, m.user);
    
    console.log(tempItem)

    this._movieService.UpdateItem(tempItem, id).subscribe({
      next: movie => {
        console.log(JSON.stringify(movie) + 'movie added');
        this.message = "movie added";
        this.Refresh();
         },
      error: (err) => this.message = err
    });

   
  }

  }

  deleteItem(m:Movie)
  {
    this._movieService.DeleteItem(m._id).subscribe({
      next: movie => {
        console.log(JSON.stringify(movie) + 'movie added');
        this.message = "movie added";
       this.Refresh();
         },
      error: (err) => this.message = err
    });
  }

  Refresh() {
    this.newItemEvent.emit();
  }


  
 

}
