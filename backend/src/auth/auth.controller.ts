import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registrar')
    async registrar(
        @Body() usuarioData: CreateUsuarioDto,
    ) {
        return this.authService.registrar(usuarioData);
    }

    @Post('login')
    async login(
        @Body() loginData: any,
    ) {
        const { email, password } = loginData; 
        console.log('Login Body recibido:', loginData);
    
        const usuario = await this.authService.validarUsuario(email, password);
        return this.authService.login(usuario);
    }
}