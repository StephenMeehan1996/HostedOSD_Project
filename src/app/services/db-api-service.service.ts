import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Movie, MovieItem } from '../interfaces/movie';
import { catchError, retry,tap,map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { UserItem } from '../interfaces/user';
import { List } from '../interfaces/list';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class DbApiServiceService {
  
  private d = environment.apiKey;
  private dataUri = `${environment.apiUri}/movie`;
  private dataAuthUser = `${environment.apiUri}/auth/local`;
  private dataUriUsers = `${environment.apiUri}/users`;

  private dataUriLists = `${environment.apiUri}/list`;
  private dataUriRating = `${environment.apiUri}/movie/rating`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  movieId: any;
  handleError: any;

  email = localStorage.getItem("email");
  picture = localStorage.getItem("picture");
  name = localStorage.getItem("name");

  addMovie(movie: MovieItem)
  {
    console.log(JSON.stringify(movie));
  
    this.http.post<any>(this.dataUri,movie).subscribe(data => {
    this.movieId = data.id;
   })

  }

  UpdateItem(item: MovieItem, id: string) : Observable<unknown>
  {
    
    return this.http.put<any>(this.dataUri +"/" + id, item)
    .pipe(
      catchError(this.handleError)
    )
  

  }

  DeleteItem(id: string): Observable<unknown>
  {

   return this.http.delete<any>(this.dataUri +"/" + id)
   .pipe(
    catchError(this.handleError)
  )
    
  }

  getMovieList(list: string) : Observable<Movie[]> {
   
    let re = ' ';
    list = list.replace(re, '%20');
    return this.http.get<Movie>(this.dataUri+'?list='+ list + '&user='+ this.name)
    .pipe(
      tap(data => console.log('list/error' + JSON.stringify(data))
      
    ),
     catchError(this.handleError)
  
    );
  };

  RegistorUser(f: FormGroup)
  {
    this.http.post<any>(this.dataUriUsers, f.value).subscribe(data => {
      this.movieId = data.id;
     })

  }

  LoginUser(f: FormGroup)
  {
    this.http.post<any>(this.dataAuthUser, f.value).subscribe(data => {
      this.movieId = data.id;
     })

  }

  CreateList(f: FormGroup): Observable<unknown>
  {
    console.log(f.value);
    return this.http.post<any>(this.dataUriLists, f.value)
    .pipe(
      catchError(this.handleError)
    )

  }

  getLists(sel: string): Observable<List[]>
  {
    let url = '';
    if(sel == "user")
    {
      url = this.dataUriLists+ '?user=' + this.name

    }
    else if(sel == "all")
    {
      url = this.dataUriLists+ '?user=' + sel
    }

      return this.http.get<List>(url)
      .pipe(
        tap(data => console.log('movie/error' + JSON.stringify(data))
      ),
       catchError(this.handleError)
    
      );
      
    }

  DeleteList(id: any) : Observable<any>
  {
    return this.http.delete<any>(this.dataUriLists +"/" + id) 
    .pipe(
      catchError(this.handleError)
    )
   
  }

  updateList(id: any, item: List): Observable<any>
  {
    return this.http.put<any>(this.dataUriLists +"/" + id, item)
    .pipe(
      catchError(this.handleError)
    )

  }

 
  FilterbyRating(r: Number, list: string): Observable<Movie[]>
  {
    return this.http.get<Movie>(this.dataUriRating + '?r=' + r + '&list=' + list + '&user=' + this.name)
    .pipe(
      tap(data => console.log('list/error' + JSON.stringify(data))
    ),
     catchError(this.handleError)
  
    );

  }
  async getAllUsers(): Promise<any[]> {
    const token = await this.auth.getAccessTokenSilently().toPromise();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>('dev-03fqz11ljqyddlnf.us.auth0.com/api/v2/users', { headers }).toPromise();
  }





}
