import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PTransportComponent } from './p-applicant.component';

describe('PTransportComponent', () => {
  let component: PTransportComponent;
  let fixture: ComponentFixture<PTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PTransportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
