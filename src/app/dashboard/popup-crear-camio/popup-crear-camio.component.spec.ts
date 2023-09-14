import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrearCamioComponent } from './popup-crear-camio.component';

describe('PopupCrearCamioComponent', () => {
  let component: PopupCrearCamioComponent;
  let fixture: ComponentFixture<PopupCrearCamioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCrearCamioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCrearCamioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
