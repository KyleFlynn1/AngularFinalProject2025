import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockcalculatorComponent } from './stockcalculator.component';

describe('StockcalculatorComponent', () => {
  let component: StockcalculatorComponent;
  let fixture: ComponentFixture<StockcalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockcalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
