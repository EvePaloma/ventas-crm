import { IsString, IsNotEmpty, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateTareaDto {
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsOptional()
    estado?: string;

    @IsDateString()
    @IsOptional()
    fechaLimite?: Date;

    @IsNumber()
    @IsNotEmpty()
    clienteId: number;
    
}
