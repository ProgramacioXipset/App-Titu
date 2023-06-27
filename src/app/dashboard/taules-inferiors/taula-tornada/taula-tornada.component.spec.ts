import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulaTornadaComponent } from './taula-tornada.component';

describe('TaulaTornadaComponent', () => {
  let component: TaulaTornadaComponent;
  let fixture: ComponentFixture<TaulaTornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaulaTornadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaulaTornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
