import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavComponent
      ],
    }).compileComponents();
  }));

  it('should create the nav', async(() => {
    const fixture = TestBed.createComponent(NavComponent);
    const nav = fixture.debugElement.componentInstance;
    expect(nav).toBeTruthy();
  }));

  it(`should have as title 'GenIV Camera'`, async(() => {
    const fixture = TestBed.createComponent(NavComponent);
    const nav = fixture.debugElement.componentInstance;
    expect(nav.title).toEqual('GenIV Camera');
  }));

  it('should render title as brand', async(() => {
    const fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.nav-brand').textContent).toContain('GenIV Camera');
  }));
});
