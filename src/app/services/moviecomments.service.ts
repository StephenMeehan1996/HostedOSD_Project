import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, Observable, tap } from 'rxjs';
import { MovieComment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class MoviecommentsService {

  //get: https://u1sqowh7l5.execute-api.eu-west-1.amazonaws.com/dev/moviecom
  //post:  https://u1sqowh7l5.execute-api.eu-west-1.amazonaws.com/dev/moviecom
  
  handleError: any;
  constructor(private http: HttpClient) { }

  postComment(f: FormGroup): Observable<MovieComment[]>
  {
    console.log(f.value);
    return this.http.post<any>("https://u1sqowh7l5.execute-api.eu-west-1.amazonaws.com/dev/moviecom", f.value)
    .pipe(
      catchError(this.handleError)
    )

  }

  getComments(id: string): Observable<MovieComment[]>
  {
      return this.http.get<MovieComment>("https://952ay0immg.execute-api.eu-west-1.amazonaws.com/GetMovieComments?id=" + id +'&sel=t')
      .pipe(
        tap(data => console.log('comment' + JSON.stringify(data))
      ),
       catchError(this.handleError)
    
      );
      
    }

    DeleteComment(id: string): Observable<unknown>
    {
  
     return this.http.delete<any>("https://952ay0immg.execute-api.eu-west-1.amazonaws.com/del?id=" + id)
     .pipe(
      catchError(this.handleError)
    )
      
    }

    updateVotes(id: string,sel: string)
    {
      return this.http.get<any>('https://952ay0immg.execute-api.eu-west-1.amazonaws.com/votes?id='+id+'&sel='+sel)
      .pipe(
        catchError(this.handleError)
      )
    

    }
}
