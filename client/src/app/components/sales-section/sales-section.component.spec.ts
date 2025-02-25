import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSectionComponent } from './sales-section.component';

describe('SalesSectionComponent', () => {
  let component: SalesSectionComponent;
  let fixture: ComponentFixture<SalesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
