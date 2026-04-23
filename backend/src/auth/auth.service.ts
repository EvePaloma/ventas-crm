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
    return this.usuariosService.create(createUsuarioDto);
  }

  async validarUsuario(email: string, passwordPlana: string) {
    const emailNormalizado = email.trim().toLowerCase();
    const usuario = await this.usuariosService.findByEmailWithPassword(emailNormalizado);
    
    if (!usuario) {
        throw new UnauthorizedException('El email no existe en nuestra base de datos');
    }

    const esValida = await bcrypt.compare(passwordPlana, usuario.password);

    if (!esValida) {
        throw new UnauthorizedException('Contraseña incorrecta');
    }

    const { password, ...resultado } = usuario;
    return resultado;
  }

  async login(usuario: any) {
    
    const payload = { 
      email: usuario.email, 
      sub: usuario.id, 
      rol: usuario.rol.nombre 
    };

    return {
      token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol.nombre 
      }
    };
  }
}