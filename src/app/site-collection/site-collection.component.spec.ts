import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCollectionComponent } from './site-collection.component';

describe('SiteCollectionComponent', () => {
  let component: SiteCollectionComponent;
  let fixture: ComponentFixture<SiteCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
