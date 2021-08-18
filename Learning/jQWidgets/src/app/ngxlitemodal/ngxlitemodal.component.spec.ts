import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxlitemodalComponent } from './ngxlitemodal.component';

describe('NgxlitemodalComponent', () => {
  let component: NgxlitemodalComponent;
  let fixture: ComponentFixture<NgxlitemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxlitemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxlitemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
