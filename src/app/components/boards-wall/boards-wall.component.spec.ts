import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { concat, EMPTY, of, throwError } from 'rxjs';
import { BoardsService } from 'src/app/services/boards.service';
import { BoardsWallComponent } from './boards-wall.component';
import { Post } from 'src/app/interfaces/post';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('BoardsWallComponent', () => {
  let component: BoardsWallComponent;
  let fixture: ComponentFixture<BoardsWallComponent>;
  let boardsService: jasmine.SpyObj<BoardsService>;

  beforeEach(async () => {
    boardsService = jasmine.createSpyObj('BoardsService', ['getPosts']);

    await TestBed.configureTestingModule({
      declarations: [ BoardsWallComponent ],
      imports: [ HttpClientTestingModule, HttpClientModule ],
      providers: [ { provide: BoardsService, useValue: boardsService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get posts on initialization', () => {
    const mockPosts: Post[] = [{ _id: "111", user : "james", date: "01/02/03" ,postTitle: 'Post 1', postContent: "test", postImage: "null", voteCount: 5, displayComments: false }, 
    { _id: "3333", user : "john", date: "01/02/03" ,postTitle: 'Post 1', postContent: "test", postImage: "null", voteCount: 5, displayComments: false}];

    boardsService.getPosts.and.returnValue(of(mockPosts as Post[]));

    component.ngOnInit();

    expect(component.posts).toEqual(mockPosts);
  });

  it('should set message if getPosts() errors', () => {
    const mockError = 'An error occurred';
  
    boardsService.getPosts.and.returnValue(concat(throwError(mockError), EMPTY));
  
    component.GetPosts();
  
    expect(component.message).toEqual(mockError);
  });
});


