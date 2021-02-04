import { Rol } from './rol.model';

export class Usuario {

  id: number;
  username: string;
  password: string;
  nombre: string;
  rol: Rol;
  enabled: boolean;

}
