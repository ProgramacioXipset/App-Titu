import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrearXoferComponent } from './popup-crear-xofer.component';

describe('PopupCrearXoferComponent', () => {
  let component: PopupCrearXoferComponent;
  let fixture: ComponentFixture<PopupCrearXoferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCrearXoferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCrearXoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
