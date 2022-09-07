import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente ha sido creado', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario debe retornar valido', () => {
    const form = component.formLogin;

    const usuario = component.formLogin.controls['usuario'];
    usuario.setValue('Justice.Kunze39');

    const contrasena = component.formLogin.controls['contrasena'];
    contrasena.setValue('FjbvpxBb6TLCvnz');

    expect(form.invalid).toBeFalse();
  });
});
