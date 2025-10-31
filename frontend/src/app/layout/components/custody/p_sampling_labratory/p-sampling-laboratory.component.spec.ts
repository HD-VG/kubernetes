import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSamplingLaboratoryComponent } from './p-sampling-laboratory.component';

describe('PSamplingLaboratoryComponent', () => {
  let component: PSamplingLaboratoryComponent;
  let fixture: ComponentFixture<PSamplingLaboratoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PSamplingLaboratoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PSamplingLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
