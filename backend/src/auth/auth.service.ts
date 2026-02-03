import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) {}

    async registrar(CreateUsuarioDto: CreateUsuarioDto ) {
        return this.usuariosService.create(CreateUsuarioDto);
    }

    async validarUsuario(email: string, passwordPlana: string) {
    const usuario = await this.usuariosService.findByEmailWhitPassword(email);
    
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado en DB');

    const esValida = await bcrypt.compare(passwordPlana, usuario.password);

    if (!esValida) {
        throw new UnauthorizedException('Contraseña incorrecta');
    }

    const { password, ...resultado } = usuario;
    return resultado;
}

    async login(usuario: any) {
        const payload = { email: usuario.email, sub: usuario.id, rol: usuario.rol };
        return {
            usuario,
            token: this.jwtService.sign(payload),
        };
    }
}