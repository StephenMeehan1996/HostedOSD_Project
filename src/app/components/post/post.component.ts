import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  message:any

  
 
 


  constructor(private _board: BoardsService) { }

  ngOnInit(): void {
  }
  ChangeVotePost(op : string)
  {
    
    if(op == "Add")
    {
      this.post.voteCount +=1;
    }

    if(this.post.voteCount > 0)
    {
      if(op == "Remove" )
      {
        this.post.voteCount -=1;
  
      }
    }

    this._board.updateVotes(this.post._id, op).subscribe({
      next: comm => {
        console.log(JSON.stringify(comm) + 'post Updated');
        this.message = "post Updated";
        this.ngOnInit()    
         },
      error: (err) => this.message = err
    });

    }
 
  
    DisplayComments()
    {
     this.post.displayComments = false; 
     
     //this._board.UpdatePost(this.post)
  
    }
  
  
   
  
    

  }

 
