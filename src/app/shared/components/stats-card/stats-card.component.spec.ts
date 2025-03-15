import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCardComponent } from './stats-card.component';

describe('StatsCardComponent', () => {
  let component: StatsCardComponent;
  let fixture: ComponentFixture<StatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display primary value with percentage when isPercentage is true', () => {
    component.primaryValue = 96.6;
    component.isPercentage = true;
    expect(component.formattedPrimaryValue).toBe('96.6%');
  });

  it('should display secondary value with percentage when showPercentage is true', () => {
    component.secondaryValue = 51.7;
    component.showPercentage = true;
    expect(component.formattedSecondaryValue).toBe('51.7%');
  });

  it('should display primary value without percentage when isPercentage is false', () => {
    component.primaryValue = 441;
    component.isPercentage = false;
    expect(component.formattedPrimaryValue).toBe('441');
  });

  it('should show stacked layout when isStacked is true', () => {
    component.isStacked = true;
    component.primaryValue = '228';
    component.label = 'Female';
    component.secondaryValue = '51.7';
    component.showPercentage = true;
    fixture.detectChanges();
    
    const cards = fixture.nativeElement.querySelectorAll('.stats-card');
    expect(cards.length).toBe(2);
    expect(cards[0].classList.contains('stacked')).toBeTruthy();
  });
});
