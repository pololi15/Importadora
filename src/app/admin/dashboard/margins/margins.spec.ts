import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Margins } from './margins';

describe('Margins', () => {
  let component: Margins;
  let fixture: ComponentFixture<Margins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Margins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Margins);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
