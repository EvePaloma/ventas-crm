import { IsEmail, IsEnum, IsNotEmpty, min, MinLength } from "class-validator";
import { RolUsuario } from "../entities/usuario.entity";

export class CreateUsuarioDto {
    @IsEmail({}, { message: 'El correo no es válido' })
    email: string;

    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @IsEnum(RolUsuario, { message: 'El rol no es válido' })
    rol: RolUsuario;
}
