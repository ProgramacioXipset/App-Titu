import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrearRemolcComponent } from './popup-crear-remolc.component';

describe('PopupCrearRemolcComponent', () => {
  let component: PopupCrearRemolcComponent;
  let fixture: ComponentFixture<PopupCrearRemolcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCrearRemolcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCrearRemolcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
