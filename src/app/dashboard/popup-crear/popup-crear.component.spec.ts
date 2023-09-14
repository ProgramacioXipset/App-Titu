import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrearComponent } from './popup-crear.component';

describe('PopupCrearComponent', () => {
  let component: PopupCrearComponent;
  let fixture: ComponentFixture<PopupCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
