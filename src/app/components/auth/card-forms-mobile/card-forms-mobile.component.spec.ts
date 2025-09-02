import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFormsMobileComponent } from './card-forms-mobile.component';

describe('CardFormsMobileComponent', () => {
  let component: CardFormsMobileComponent;
  let fixture: ComponentFixture<CardFormsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFormsMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFormsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
