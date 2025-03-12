<<<<<<< HEAD
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLessonsComponent } from './get-lessons.component';

describe('GetLessonsComponent', () => {
  let component: GetLessonsComponent;
  let fixture: ComponentFixture<GetLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetLessonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLessonsComponent } from './get-lessons.component';

describe('GetLessonsComponent', () => {
  let component: GetLessonsComponent;
  let fixture: ComponentFixture<GetLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetLessonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> dc1607a (Add existing project files)
