import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNormalComponent } from './report_normal.component';

describe('ReportNormalComponent', () => {
  let component: ReportNormalComponent;
  let fixture: ComponentFixture<ReportNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportNormalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
