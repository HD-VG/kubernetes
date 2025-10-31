import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGlobalComponent } from './report_global.component';

describe('ReportGlobalComponent', () => {
  let component: ReportGlobalComponent;
  let fixture: ComponentFixture<ReportGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportGlobalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
