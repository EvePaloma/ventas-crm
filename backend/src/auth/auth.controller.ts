import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { LoginDto } from '../auth/guards/auth/dto/login.dto'; 

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registrar')
    async registrar(@Body() usuarioData: CreateUsuarioDto) {
        return this.authService.registrar(usuarioData);
    }

    @Post('login')
    async login(@Body() loginData: LoginDto) { 
        const { email, password } = loginData; 
        
        const usuario = await this.authService.validarUsuario(email, password);
        
        return this.authService.login(usuario);
    }
}