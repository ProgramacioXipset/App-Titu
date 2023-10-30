import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLlistaViatgesAmagatsComponent } from './popup-llista-viatges-amagats.component';

describe('PopupLlistaViatgesAmagatsComponent', () => {
  let component: PopupLlistaViatgesAmagatsComponent;
  let fixture: ComponentFixture<PopupLlistaViatgesAmagatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupLlistaViatgesAmagatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupLlistaViatgesAmagatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
