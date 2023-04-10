import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieResultComponent } from './movie-result.component';

xdescribe('MovieResultComponent', () => {
  let component: MovieResultComponent;
  let fixture: ComponentFixture<MovieResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
