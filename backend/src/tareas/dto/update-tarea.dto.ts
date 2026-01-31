import { PartialType } from '@nestjs/mapped-types';
import { CreateTareaDto } from './create-tarea.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTareaDto extends PartialType(CreateTareaDto) {
    @IsString()
    @IsOptional()
    estado?: string;
}
