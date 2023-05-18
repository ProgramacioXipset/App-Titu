import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulesInferiorsComponent } from './taules-inferiors.component';

describe('TaulesInferiorsComponent', () => {
  let component: TaulesInferiorsComponent;
  let fixture: ComponentFixture<TaulesInferiorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaulesInferiorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaulesInferiorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
