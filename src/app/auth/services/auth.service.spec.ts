import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: {get: jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        RouterTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(AuthService);
  });

  it('Auth service creado', () => {
    expect(service).toBeTruthy();
  });

  it('Debería retornar un Objeto Usuario (Login Correcto)', () => {
    const mockUserCredentials = {
      usuario: 'Justice.Kunze39',
      contrasena: 'FjbvpxBb6TLCvnz',
      admin: false
    }

    const mockResultLogin = {
     "sesion" : {
        "sesionActiva": true,
        "usuario": {
          "usuario": "Justice.Kunze39",
          "contrasena": "FjbvpxBb6TLCvnz",
          "admin": true,
        }
      }
    }

    httpClientSpy.get.and.returnValue(of(mockResultLogin));

    const { usuario, contrasena } = mockUserCredentials;

    service.iniciarSesion(mockUserCredentials);
  });
});
