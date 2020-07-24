import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccurrenceReportComponent } from './occurrence-report.component';

describe('OccurrenceReportComponent', () => {
  let component: OccurrenceReportComponent;
  let fixture: ComponentFixture<OccurrenceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccurrenceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurrenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
