import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulaPrincipalComponent } from './taula-principal.component';

describe('TaulaPrincipalComponent', () => {
  let component: TaulaPrincipalComponent;
  let fixture: ComponentFixture<TaulaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaulaPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaulaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
