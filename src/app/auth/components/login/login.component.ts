import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logo = 'https://cdn-icons-png.flaticon.com/512/668/668709.png'

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  formLogin: FormGroup = new FormGroup({
    usuario: new FormControl('Justice.Kunze39', [Validators.required]),
    contrasena: new FormControl('FjbvpxBb6TLCvnz', [Validators.required]),
    admin: new FormControl(false),
  });

  login(){
    const usuario: Usuario = {
      usuario: this.formLogin.value.usuario,
      contrasena: this.formLogin.value.contrasena,
      admin: this.formLogin.value.admin,
    }

    this.auth.iniciarSesion(usuario);
  }

}
