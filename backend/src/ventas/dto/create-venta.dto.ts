import { IsNumber, IsPositive, IsInt } from "class-validator";

export class CreateVentaDto {
    @IsNumber()
    @IsPositive()
    total: number;

    @IsInt()
    @IsPositive()
    clienteId: number;

}