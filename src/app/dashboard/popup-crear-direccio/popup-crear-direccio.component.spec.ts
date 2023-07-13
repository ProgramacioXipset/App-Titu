import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrearDireccioComponent } from './popup-crear-direccio.component';

describe('PopupCrearDireccioComponent', () => {
  let component: PopupCrearDireccioComponent;
  let fixture: ComponentFixture<PopupCrearDireccioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCrearDireccioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCrearDireccioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
