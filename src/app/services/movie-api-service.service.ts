import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { catchError, retry,tap,map, retryWhen } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cast } from '../interfaces/cast';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  handleError: any;
  //https://api.themoviedb.org/3/movie/238/credits?api_key=3ac62aaaa795a1ffefac8b11c614e263&language=en-US

  constructor(private http: HttpClient) { }

  getData(search: any, page: number) : Observable<Movie[]> {
   
    `${environment.apiUri}/auth/local`
    let link = '';
    if(search == "GetAll")
    {
      link = `https://api.themoviedb.org/3/movie/top_rated?api_key=${environment.apiKey}&language=en-US&page=`+page+`&region=IE`

    }
    else
    {
      link = `https://api.themoviedb.org/3/search/movie?api_key=${environment.apiKey}&query=` + search
    }

    return this.http.get<any>(link)
    .pipe(
      tap(data => console.log('movie/error' + JSON.stringify(data))
    ),
     catchError(this.handleError)
  
    );
  };

  getCast(movieID: number)
  {
   // https://api.themoviedb.org/3/movie/235/credits?api_key=3ac62aaaa795a1ffefac8b11c614e263&language=en-US
    return this.http.get<Cast>(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=3ac62aaaa795a1ffefac8b11c614e263&language=en-US`)
    .pipe(
      tap(data => console.log('list/error' + JSON.stringify(data))
     
      
    ),
     catchError(this.handleError)
  
    );

  }

  getRandom(movieID: string)
  {
  
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${environment.apiKey}&language=en-US&page=1`)
    .pipe(
      tap(data => console.log('list/error' + JSON.stringify(data))
     
      
    ),
     catchError(this.handleError)
  
    );
  }

  getSimilarMovie(movieID: string): any {

   return this.http.get(`https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${environment.apiKey}&language=en-US&page=1`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          // If the ID is invalid, try a different one
          const newMovieId = Math.floor(Math.random() * 10000) + 1;
          
          return this.getSimilarMovie(newMovieId.toString());
        } else {
          console.error('An error occurred:', error);
          return throwError(error);
        }
      })
    )
  }
}
