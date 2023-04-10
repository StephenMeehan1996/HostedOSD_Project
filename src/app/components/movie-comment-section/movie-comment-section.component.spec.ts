import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCommentSectionComponent } from './movie-comment-section.component';

xdescribe('MovieCommentSectionComponent', () => {
  let component: MovieCommentSectionComponent;
  let fixture: ComponentFixture<MovieCommentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCommentSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
