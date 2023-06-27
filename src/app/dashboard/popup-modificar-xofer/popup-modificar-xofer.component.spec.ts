import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModificarXoferComponent } from './popup-modificar-xofer.component';

describe('PopupModificarXoferComponent', () => {
  let component: PopupModificarXoferComponent;
  let fixture: ComponentFixture<PopupModificarXoferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModificarXoferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModificarXoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
