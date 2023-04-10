import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-boards-wall',
  templateUrl: './boards-wall.component.html',
  styleUrls: ['./boards-wall.component.css']
})
export class BoardsWallComponent implements OnInit {
  public posts :Post[] = [];
  message: any;
  constructor(private _boards: BoardsService) { }

  ngOnInit(): void {
    this.GetPosts();
  }
  
  GetPosts()
  {  
    this._boards.getPosts().subscribe({
      next: (value: Post[] )=> this.posts = value,
      complete: () => console.log('List service finished ' + this.posts[0]),
      error: (mess: any) => this.message = mess
    })
    
    return false;
  }


}
