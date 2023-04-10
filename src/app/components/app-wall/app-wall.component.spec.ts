import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWallComponent } from './app-wall.component';


xdescribe('AppWallComponent', () => {
  let component: AppWallComponent;
  let fixture: ComponentFixture<AppWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppWallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});

import { viewDetails } from './app-wall.component';
import { MovieTestingItem } from 'src/app/interfaces/movie';
// _id: string;
// title: string;
// showEditDetail: boolean;

describe('viewDetails', () => {
  it('should toggle the showDetail property of the given movie', () => {
    const mockMovie: MovieTestingItem = { _id: "1", title: 'The Matrix', showDetail: false };
    viewDetails(mockMovie);
    expect(mockMovie.showDetail).toBeTrue();

    viewDetails(mockMovie);
    expect(mockMovie.showDetail).toBeFalse();
  });
});


