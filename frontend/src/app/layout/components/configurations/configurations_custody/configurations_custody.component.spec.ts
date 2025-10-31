import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsCustodyComponent } from './configurations_custody.component';

describe('ConfigurationsCustodyComponent', () => {
  let component: ConfigurationsCustodyComponent;
  let fixture: ComponentFixture<ConfigurationsCustodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationsCustodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationsCustodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
