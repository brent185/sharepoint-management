import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTreeUserComponent } from './site-tree-user.component';

describe('SiteTreeUserComponent', () => {
  let component: SiteTreeUserComponent;
  let fixture: ComponentFixture<SiteTreeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteTreeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTreeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
