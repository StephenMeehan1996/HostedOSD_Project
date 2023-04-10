import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListsComponent } from './search-lists.component';

xdescribe('SearchListsComponent', () => {
  let component: SearchListsComponent;
  let fixture: ComponentFixture<SearchListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
