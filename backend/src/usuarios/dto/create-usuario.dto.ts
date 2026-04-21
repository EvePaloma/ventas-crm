import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'El formato del email no es válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsNumber({}, { message: 'El rolId debe ser un número' })
  @IsNotEmpty({ message: 'El ID de rol es obligatorio' })
  rolId: number; 
}