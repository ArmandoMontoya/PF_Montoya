import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logo = 'https://cdn-icons-png.flaticon.com/512/668/668709.png';
  listaUsuarios:any;

  constructor(private router: Router, private auth: AuthService, private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.listaUsuarios = this.usuariosService.getUsuarios();
  }

  formLogin: FormGroup = new FormGroup({
    usuario: new FormControl('Torrey_Mayer49', [Validators.required]),
    contrasena: new FormControl('Wx1yAoylcqds0L0', [Validators.required]),
    admin: new FormControl(false),
  });

  login(){
    const usuario: Usuario = {
      User: this.formLogin.value.usuario,
      Password: this.formLogin.value.contrasena,
      Admin: this.formLogin.value.admin,
    }

    this.auth.iniciarSesion(usuario);
  }

}
