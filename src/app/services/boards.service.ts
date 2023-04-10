import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, Observable, tap } from 'rxjs';
import { Comments } from '../interfaces/comment';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private http: HttpClient) { }

  handleError: any;

  //comment: https://952ay0immg.execute-api.eu-west-1.amazonaws.com/deletecomments?id=63e515500f8fda2509d40aca
  //post: https://952ay0immg.execute-api.eu-west-1.amazonaws.com/deletePosts

  CreatePost(f: FormGroup): Observable<Post[]>
  {
    console.log(f.value);
    return this.http.post<any>("https://u1sqowh7l5.execute-api.eu-west-1.amazonaws.com/dev/posts", f.value)
    .pipe(
      catchError(this.handleError)
    )

  }

  CreateComment(f:FormGroup)
  {
    console.log(f.value);
    return this.http.post<any>("https://u1sqowh7l5.execute-api.eu-west-1.amazonaws.com/dev/comments", f.value)
    .pipe(
      catchError(this.handleError)
    )


  }

  updateCommentVotes(id: string,sel: string)
  {
    alert(id)
   
    return this.http.get<any>('https://952ay0immg.execute-api.eu-west-1.amazonaws.com/updateComm?id='+id+'&sel='+sel)
    .pipe(
      catchError(this.handleError)
    )
    }

    getComments(id: string): Observable<Comments[]>
    {


    
        return this.http.get<Comments>(" https://952ay0immg.execute-api.eu-west-1.amazonaws.com/comm?id="+id)
        .pipe(
          tap(data => console.log('post' + JSON.stringify(data))
        ),
         catchError(this.handleError)
      
        );
        
      }

  getPosts(): Observable<Post[]>
  {
   

      return this.http.get<Post>("https://u1sqowh7l5.execute-api.eu-west-1.amazonaws.com/dev/posts")
      .pipe(
        tap(data => console.log('post' + JSON.stringify(data))
      ),
       catchError(this.handleError)
    
      );
      
    }
    //https://u1sqowh7l5.execute-api.eu-west-1.amazonaws.com/dev/comments

    updateVotes(id: string,sel: string)
    {
     
      return this.http.get<any>('https://952ay0immg.execute-api.eu-west-1.amazonaws.com/postvotes?id='+id+'&sel='+sel)
      .pipe(
        catchError(this.handleError)
      )
      }

      deletePosts(id: string)
      {
      
      
         return this.http.get<any>("https://952ay0immg.execute-api.eu-west-1.amazonaws.com/deletePosts?id=" + id)
         .pipe(
          catchError(this.handleError)
        )
          
        

      }

      deleteComments(id: string)
      {
        return this.http.get<any>("https://952ay0immg.execute-api.eu-west-1.amazonaws.com/deletecomments?id=" + id)
        .pipe(
         catchError(this.handleError)
       )
         

      }
  

}
