import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIApComponent } from './p-i-ap.component';

describe('PIApComponent', () => {
  let component: PIApComponent;
  let fixture: ComponentFixture<PIApComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PIApComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PIApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
