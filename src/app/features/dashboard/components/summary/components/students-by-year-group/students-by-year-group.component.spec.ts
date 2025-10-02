import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsByYearGroupComponent } from './students-by-year-group.component';

describe('StudentsByYearGroupComponent', () => {
  let component: StudentsByYearGroupComponent;
  let fixture: ComponentFixture<StudentsByYearGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsByYearGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsByYearGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
