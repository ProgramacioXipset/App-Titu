import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulaAvuixavuiComponent } from './taula-avuixavui.component';

describe('TaulaAvuixavuiComponent', () => {
  let component: TaulaAvuixavuiComponent;
  let fixture: ComponentFixture<TaulaAvuixavuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaulaAvuixavuiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaulaAvuixavuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
