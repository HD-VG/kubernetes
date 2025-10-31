import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSamplingComponent } from './p-sampling.component';

describe('PSamplingComponent', () => {
  let component: PSamplingComponent;
  let fixture: ComponentFixture<PSamplingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PSamplingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PSamplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
