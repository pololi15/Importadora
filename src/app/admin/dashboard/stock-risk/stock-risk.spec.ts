import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRisk } from './stock-risk';

describe('StockRisk', () => {
  let component: StockRisk;
  let fixture: ComponentFixture<StockRisk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockRisk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockRisk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
