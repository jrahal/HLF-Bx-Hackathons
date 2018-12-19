import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IDCardComponent } from './idcard.component';

describe('IDCardComponent', () => {
  let component: IDCardComponent;
  let fixture: ComponentFixture<IDCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
