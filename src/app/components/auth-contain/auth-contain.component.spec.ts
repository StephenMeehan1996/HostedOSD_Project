import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthContainComponent } from './auth-contain.component';

xdescribe('AuthContainComponent', () => {
  let component: AuthContainComponent;
  let fixture: ComponentFixture<AuthContainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthContainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthContainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
