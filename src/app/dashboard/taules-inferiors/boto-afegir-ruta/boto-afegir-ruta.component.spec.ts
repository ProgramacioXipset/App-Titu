import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoAfegirRutaComponent } from './boto-afegir-ruta.component';

describe('BotoAfegirRutaComponent', () => {
  let component: BotoAfegirRutaComponent;
  let fixture: ComponentFixture<BotoAfegirRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotoAfegirRutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotoAfegirRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
