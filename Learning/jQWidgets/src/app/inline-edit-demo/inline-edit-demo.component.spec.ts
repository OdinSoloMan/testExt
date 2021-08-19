import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineEditDemoComponent } from './inline-edit-demo.component';

describe('InlineEditDemoComponent', () => {
  let component: InlineEditDemoComponent;
  let fixture: ComponentFixture<InlineEditDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineEditDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineEditDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
