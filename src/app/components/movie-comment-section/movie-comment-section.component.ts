import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieComment } from 'src/app/interfaces/comment';
import { MoviecommentsService } from 'src/app/services/moviecomments.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-comment-section',
  templateUrl: './movie-comment-section.component.html',
  styleUrls: ['./movie-comment-section.component.css']
})
export class MovieCommentSectionComponent implements OnInit {

  constructor(private _comments : MoviecommentsService) { }

  @Input() movie?: any;
  public comments :MovieComment[] = [];
  message: any;
  profilePic = ''; 
  signedInUser = '';
  err: any;
  
  ngOnInit(): void {
    this.profilePic = environment.picture;
    this.signedInUser = environment.email;
    this.GetComments(this.movie._id);
  }

 
  commentForm = new FormGroup({
    user: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    profilePic: new FormControl('', Validators.required),
    commentBody: new FormControl('', Validators.required),
    likes: new FormControl(0, Validators.required),
    movieID: new FormControl('', Validators.required),
  });

  GetComments(id : string)
  {  
    this._comments.getComments(id).subscribe({
      next: (value: MovieComment[] )=> this.comments = value,
      complete: () => console.log('comment service finished ' + this.comments[0]),
      error: (mess: any) => this.message = mess
    })
    
    return false;
  }

  postComment()
  {
    let date = new Date().toString();
    //add search movies on form to get poster// 
    this.commentForm.controls['user'].setValue(environment.email);
    this.commentForm.controls['date'].setValue(date);
    this.commentForm.controls['profilePic'].setValue(environment.picture);
    this.commentForm.controls['movieID'].setValue(this.movie._id);
    
  

    this._comments.postComment(this.commentForm).subscribe({
      next: (comment: any) => {
        console.log(JSON.stringify(comment) + 'comment added');
        this.message = "comment added";
        this.GetComments(this.movie._id)
        
  
         },
      error: (err) => this.message = err
    });

   
  
  }

getTimeDiff(timestampStr: string): string {
  const timestamp = new Date(timestampStr).getTime();
  const now = Date.now();
  const diff = now - timestamp;
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  }

  DeleteComment(id: string)
  {
    this._comments.DeleteComment(id).subscribe({
      next: com => {
        console.log(JSON.stringify(com) + 'comment deleted');
        this.message = "comment deleted";
        this.GetComments(this.movie._id)
       
         },
      error: (err) => this.message = err
    });

  }
  updateVotes(id: string,sel: string, comment: MovieComment)
  {
    // making change in front end as HTTP can take a couple of seconds
    if(sel == "up")
    {
      comment.likes++;
    }
    else
    {
      comment.likes--;
    }
    this._comments.updateVotes(id, sel).subscribe({
      next: comm => {
        console.log(JSON.stringify(comm) + 'Comment Updated');
        this.message = "Comment Updated";
        this.ngOnInit()    
         },
      error: (err) => this.message = err
    });


  }

  

}
