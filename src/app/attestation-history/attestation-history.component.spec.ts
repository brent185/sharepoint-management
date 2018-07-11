import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationHistoryComponent } from './attestation-history.component';

describe('AttestationHistoryComponent', () => {
  let component: AttestationHistoryComponent;
  let fixture: ComponentFixture<AttestationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
