import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @MinLength(3, {message: 'El nombre debe tener al menos 3 caracteres'})
    nombre: string;

    @IsEmail({}, {message: 'El correo no es válido'})
    @IsNotEmpty({message: 'El email es obligatorio'})
    email: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsString()
    @IsOptional()
    estado?: string;

}
