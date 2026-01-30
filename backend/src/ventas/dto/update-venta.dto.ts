import { PartialType } from '@nestjs/mapped-types';
import { CreateVentaDto } from './create-venta.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateVentaDto extends PartialType(CreateVentaDto) {
    @IsString()
    @IsOptional()
    estado?: string;
}
