import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDatailedViewComponent } from './user-datailed-view.component';

describe('UserDatailedViewComponent', () => {
  let component: UserDatailedViewComponent;
  let fixture: ComponentFixture<UserDatailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDatailedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDatailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
