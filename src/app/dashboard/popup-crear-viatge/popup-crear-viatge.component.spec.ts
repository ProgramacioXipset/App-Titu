import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrearViatgeComponent } from './popup-crear-viatge.component';

describe('PopupCrearViatgeComponent', () => {
  let component: PopupCrearViatgeComponent;
  let fixture: ComponentFixture<PopupCrearViatgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCrearViatgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCrearViatgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
