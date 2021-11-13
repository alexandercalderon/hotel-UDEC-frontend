import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckOutComponent } from './add-check-out.component';

describe('AddCheckOutComponent', () => {
  let component: AddCheckOutComponent;
  let fixture: ComponentFixture<AddCheckOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCheckOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
