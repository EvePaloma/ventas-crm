import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async registrar(createUsuarioDto: CreateUsuarioDto) {
    // Usamos el servicio de usuarios que ya maneja la lógica de roles
    return this.usuariosService.create(createUsuarioDto);
  }

  async validarUsuario(email: string, passwordPlana: string) {
    // 1. Buscamos al usuario con el método que trae el password y el rol
    const usuario = await this.usuariosService.findByEmailWithPassword(email);
    
    if (!usuario) {
        throw new UnauthorizedException('El email no existe en nuestra base de datos');
    }

    // 2. Comparamos la contraseña plana del login con el hash de la DB
    const esValida = await bcrypt.compare(passwordPlana, usuario.password);

    if (!esValida) {
        throw new UnauthorizedException('Contraseña incorrecta');
    }

    // 3. Quitamos el password del objeto antes de devolverlo
    const { password, ...resultado } = usuario;
    return resultado;
  }

  async login(usuario: any) {
    // ACLARACIÓN: 'usuario' aquí es lo que devolvió 'validarUsuario'
    // Como usamos eager: true o join, usuario.rol es un objeto { id, nombre }
    
    const payload = { 
      email: usuario.email, 
      sub: usuario.id, 
      rol: usuario.rol.nombre // <--- CAMBIO CLAVE: Guardamos el nombre 'admin' o 'vendedor'
    };

    return {
      token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol.nombre // Esto le sirve a React para saber qué mostrar
      }
    };
  }
}