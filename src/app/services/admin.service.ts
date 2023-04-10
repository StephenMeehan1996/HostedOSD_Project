import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Post } from '../interfaces/post';
import { HttpClient } from '@angular/common/http';
import { Comments, MovieComment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
//https://952ay0immg.execute-api.eu-west-1.amazonaws.com/getcomments

 handleError: any; 

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<Comments[]>
  {
   

      return this.http.get<Post>("https://952ay0immg.execute-api.eu-west-1.amazonaws.com/getcomments")
      .pipe(
        tap(data => console.log('post' + JSON.stringify(data))
      ),
       catchError(this.handleError)
    
      );
      
    }

  //can use get all posts from board service

  getAllMovieComments(): Observable<MovieComment[]>
  {
      return this.http.get<MovieComment>("https://952ay0immg.execute-api.eu-west-1.amazonaws.com/GetMovieComments?id=1234&sel=all")
      .pipe(
        tap(data => console.log('comment' + JSON.stringify(data))
      ),
       catchError(this.handleError)
    
      );
      
    }
}
