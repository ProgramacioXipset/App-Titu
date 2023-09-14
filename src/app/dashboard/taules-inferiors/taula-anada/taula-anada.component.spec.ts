import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulaAnadaComponent } from './taula-anada.component';

describe('TaulaAnadaComponent', () => {
  let component: TaulaAnadaComponent;
  let fixture: ComponentFixture<TaulaAnadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaulaAnadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaulaAnadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
