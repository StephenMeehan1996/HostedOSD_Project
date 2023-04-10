import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Comments, MovieComment } from 'src/app/interfaces/comment';
import { List } from 'src/app/interfaces/list';
import { Movie } from 'src/app/interfaces/movie';
import { Post } from 'src/app/interfaces/post';
import { AdminService } from 'src/app/services/admin.service';
import { BoardsService } from 'src/app/services/boards.service';
import { DbApiServiceService } from 'src/app/services/db-api-service.service';
import { MovieApiServiceService } from 'src/app/services/movie-api-service.service';
import { MoviecommentsService } from 'src/app/services/moviecomments.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPageComponent implements OnInit {
  public Lists:List[] = [];
  public comments:Comments[] = [];
  public allComments:Comments[] = [];
  public mComments:MovieComment[] = [];
  public posts :Post[] = [];
  public movieList:Movie[] = [];

  email = localStorage.getItem("email");
  picture = localStorage.getItem("picture");
  name = localStorage.getItem("name");
  lastLogin = localStorage.getItem("lastLogin")

  message: any;
  showList = false;

  tempList: List;
  flag = "admin";
 



  constructor(private db: AdminService, private _boards: BoardsService, private _movieService: DbApiServiceService, private _comments : MoviecommentsService) { }

  ngOnInit(): void {



    this.getAllForumPosts();
    this.GetAllLists();
    this.getAllMovieComments();
    this.GetAllComments();
 

  }
  refreshMovies(list: string) {
    this.GetListMovies(list);
   }
  getAllMovieComments()
  {
    this.db.getAllMovieComments().subscribe(
      c =>{
       this.mComments = c
       
        
      })
  }

  getAllForumPosts()
  {
    this._boards.getPosts().subscribe({
      next: (value: Post[] )=> this.posts = value,
      complete: () => console.log('List service finished ' + this.posts[0]),
      error: (mess: any) => this.message = mess
    })
    
    return false;
  }

  GetPosts()
  {  
    this._boards.getPosts().subscribe({
      next: (value: Post[] )=> this.posts = value,
      complete: () => console.log('boards finished ' + this.posts[0]),
      error: (mess: any) => this.message = mess
    })
    
    return false;
  }

  GetCommentsForPost(id: string)
{  
  this._boards.getComments(id).subscribe(
    {
    next: (value: Comments[] )=> this.comments = value,
    complete: () => console.log('List service finished ' + this.comments[0]),
    error: (mess: any) => this.message = mess
  })

  return false;
}

GetAllComments()
{  
  this.db.getAllComments().subscribe(
   c => {
    this.allComments = c;
  
    
  })

  return false;
}

public GetAllLists()
{
  

  this._movieService.getLists("all").subscribe({
    next: (value: List[] )=> this.Lists = value,
    complete: () => console.log('List service finished ' + this.Lists[0].title),
    error: (mess: any) => this.message = mess
  })

}

deleteList(list: any)
{
  this.showList = false;
  this._movieService.DeleteList(list).subscribe({
    next: l => {
      console.log(JSON.stringify(l) + 'list added');
      this.message = "list added";
      this.GetAllLists();    
       },
    error: (err) => this.message = err
  });


}

deletePost(id: string)
{
  this._boards.deletePosts(id).subscribe({
    next: l => {
      console.log(JSON.stringify(l) + 'post deleted');
      this.message = "post Delted";
      this.getAllForumPosts();    
       },
    error: (err) => this.message = err
  });


}
deleteComment(id: string)
{
  this._boards.deleteComments(id).subscribe({
    next: l => {
      console.log(JSON.stringify(l) + 'comment deleted');
      this.message = "comment deleted";
      this.GetAllComments();
      
       },
    error: (err) => this.message = err
  });


}

deleteMComment(id: string)
{
  this._comments.DeleteComment(id).subscribe({
    next: com => {
      console.log(JSON.stringify(com) + 'comment deleted');
      this.message = "comment deleted";
      this.getAllMovieComments();
     
       },
    error: (err) => this.message = err
  });
}



ShowList(l: List)
{
  this.GetListMovies(l._id)
  this.showList = true;
  this.tempList = l;

}

GetListMovies(list:string)
{

  this.showList= true;

  this._movieService.getMovieList(list).subscribe({
    next: (value: Movie[] )=> this.movieList = value,
    complete: () => console.log('movie service finished ' + JSON.stringify(this.movieList)),
    error: (mess) => this.message = mess
  })
  
  return false;
 
}



}
