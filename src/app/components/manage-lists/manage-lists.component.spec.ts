import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageListsComponent } from './manage-lists.component';

xdescribe('ManageListsComponent', () => {
  let component: ManageListsComponent;
  let fixture: ComponentFixture<ManageListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
