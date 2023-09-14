import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModificarCamioComponent } from './popup-modificar-camio.component';

describe('PopupModificarCamioComponent', () => {
  let component: PopupModificarCamioComponent;
  let fixture: ComponentFixture<PopupModificarCamioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModificarCamioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModificarCamioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
