import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderRatioComponent } from './gender-ratio.component';

describe('GenderRatioComponent', () => {
  let component: GenderRatioComponent;
  let fixture: ComponentFixture<GenderRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderRatioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
