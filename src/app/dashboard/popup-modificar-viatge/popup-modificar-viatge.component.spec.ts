import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModificarViatgeComponent } from './popup-modificar-viatge.component';

describe('PopupModificarViatgeComponent', () => {
  let component: PopupModificarViatgeComponent;
  let fixture: ComponentFixture<PopupModificarViatgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModificarViatgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModificarViatgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
