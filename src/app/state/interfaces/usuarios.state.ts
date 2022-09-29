import { Usuario } from "src/app/usuarios/interfaces/usuario";


export interface UsuariosState {
  loading: boolean;
  usuarios: Array<Usuario>;
}
