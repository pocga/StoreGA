import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOrderComponent } from './check-order.component';

describe('CheckOrderComponent', () => {
  let component: CheckOrderComponent;
  let fixture: ComponentFixture<CheckOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
