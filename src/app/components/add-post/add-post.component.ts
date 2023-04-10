import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@auth0/auth0-angular';
import { BoardsService } from 'src/app/services/boards.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(private _board: BoardsService) { }

  message: any;
  err: any;
  email = localStorage.getItem("email");
  picture = localStorage.getItem("picture");
  name = localStorage.getItem("name");
  showForm = false;

  @Output() newItemEvent = new EventEmitter();

  PostForm = new FormGroup({
    user: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    postTitle: new FormControl('', Validators.required),
    postContent: new FormControl('', Validators.required),
    postImage: new FormControl('', Validators.required),
    voteCount: new FormControl(0, Validators.required),
    displayComments: new FormControl(true, Validators.required),

  });
  ngOnInit(): void {


  }

  AddPost()
  {
    let date = new Date().toString();
    //add search movies on form to get poster// 
    this.PostForm.controls['user'].setValue(environment.email);
    this.PostForm.controls['date'].setValue(date);
    this.PostForm.controls['voteCount'].setValue(0);
    this.PostForm.controls['displayComments'].setValue(false);
    this.PostForm.controls['postImage'].setValue(this.picture);
    console.log(this.PostForm.value);

  

    this._board.CreatePost(this.PostForm).subscribe({
      next: (post: any) => {
        console.log(JSON.stringify(post) + 'post added');
        this.message = "list added";
        //calls getpost in parent component to refresh//
        this.newItemEvent.emit();
         
         },
      error: (err) => this.message = err
    });

   
  
  }

  onCreate()
  {

  }
  refreshPosts() {
   

  }

}
