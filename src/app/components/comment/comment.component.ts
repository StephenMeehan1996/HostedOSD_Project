import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comments } from 'src/app/interfaces/comment';
import { Post } from 'src/app/interfaces/post';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() post: Post
  public comments :Comments[] = [];
  message: any;
  err: any;

  email = localStorage.getItem("email");
  picture = localStorage.getItem("picture");
  name = localStorage.getItem("name");

  
   CommentForm = new FormGroup({
    user: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    CommentContent: new FormControl('', Validators.required),
    voteCount: new FormControl(0, Validators.required),
    profilePic: new FormControl('', Validators.required),
    postID : new FormControl('')

  });
  constructor(private _board: BoardsService) { }

  ngOnInit(): void {

    this.GetComments(this.post._id);
   
  }

  AddComment()
  {
    console.log(this.CommentForm.value);
    let date = new Date().toString();
    //add search movies on form to get poster// 
    this.CommentForm.controls['user'].setValue(this.name);
    this.CommentForm.controls['date'].setValue(date);
    this.CommentForm.controls['voteCount'].setValue(0);
    this.CommentForm.controls['profilePic'].setValue(this.picture);
    this.CommentForm.controls['postID'].setValue(this.post._id);


    this._board.CreateComment(this.CommentForm).subscribe({
      next: (post: any) => {
        console.log(JSON.stringify(post) + 'comment added');
        this.message = "comment added";
        this.GetComments(this.post._id)
         },
      error: (err) => this.message = err
    });


}

GetComments(id: string)
{  
  this._board.getComments(id).subscribe({
    next: (value: Comments[] )=> this.comments = value,
    complete: () => console.log('List service finished ' + this.comments[0]),
    error: (mess: any) => this.message = mess
  })




  
  return false;
}

ChangeVotePost(comment: Comments, op : string)
{
  
  if(op == "Add")
  {
    comment.voteCount +=1;
  }

  if(comment.voteCount > 0)
  {
    if(op == "Remove" )
    {
      comment.voteCount -=1;

    }
  }

  this._board.updateCommentVotes(comment._id, op).subscribe({
    next: comm => {
      console.log(JSON.stringify(comm) + 'post Updated');
      this.message = "post Updated";
      this.ngOnInit()    
       },
    error: (err) => this.message = err
  });

  }

}
