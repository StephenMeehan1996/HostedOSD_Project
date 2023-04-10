import { Component, Input, OnInit } from '@angular/core';
import { Cast, Crew } from 'src/app/interfaces/cast';
import { MovieApiServiceService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-cast-crew',
  templateUrl: './cast-crew.component.html',
  styleUrls: ['./cast-crew.component.css']
})
export class CastCrewComponent implements OnInit {

  constructor(private _ApiService: MovieApiServiceService ) { }
  @Input() movieID: number;
  public cast:Cast[] = [];
  public crew:Crew[] = [];

  
  isCarousel = false;

  ngOnInit(): void {
    this.getCast();

  

  }
  getCast()
  {
    this._ApiService.getCast(this.movieID).subscribe(
      c =>{
        this.cast = c.cast;
        this.crew = c.crew;
        console.log(JSON.stringify(this.crew));
     
        
      })
  }



}
