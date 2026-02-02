import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('No se encontró un token');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: 'LLAVE_SECRETA_DE_JWT',
        });
        request['usuario'] = payload;
        } catch {
          throw new UnauthorizedException('Token inválido');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
    // Usamos el método .get() de Express que ya tiene los tipos bien definidos
    const authHeader = request.get('authorization'); 
    
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
