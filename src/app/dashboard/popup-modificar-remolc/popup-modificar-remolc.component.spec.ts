import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModificarRemolcComponent } from './popup-modificar-remolc.component';

describe('PopupModificarRemolcComponent', () => {
  let component: PopupModificarRemolcComponent;
  let fixture: ComponentFixture<PopupModificarRemolcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModificarRemolcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModificarRemolcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
