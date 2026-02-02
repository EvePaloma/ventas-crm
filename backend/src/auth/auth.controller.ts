import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Body ('email') email: string,
        @Body ('password') passwordPlana: string,
    ) {
        const usuario = await this.authService.validarUsuario(email, passwordPlana);
        return this.authService.login(usuario);
    }
}
