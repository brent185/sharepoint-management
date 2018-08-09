import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTcComponent } from './admin-tc.component';

describe('AdminTcComponent', () => {
  let component: AdminTcComponent;
  let fixture: ComponentFixture<AdminTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
