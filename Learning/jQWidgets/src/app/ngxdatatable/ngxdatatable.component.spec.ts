import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxdatatableComponent } from './ngxdatatable.component';

describe('NgxdatatableComponent', () => {
  let component: NgxdatatableComponent;
  let fixture: ComponentFixture<NgxdatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxdatatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxdatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
