import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) {}

    async validarUsuario(email: string, password: string) {
        const usuario = await this.usuariosService.findByEmailWhitPassword(email);
        if (!usuario) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const { password: usuarioPassword, ...resultado } = usuario;
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