import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInscripcionesComponent } from './dialog-inscripciones.component';

describe('DialogInscripcionesComponent', () => {
  let component: DialogInscripcionesComponent;
  let fixture: ComponentFixture<DialogInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInscripcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
