import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { RolesGuard } from 'src/auth/guards/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('ventas')
@UseGuards(AuthGuard, RolesGuard)
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @Roles('admin', 'vendedor')
  create(@Body() createVentaDto: CreateVentaDto, @Request() req: any) {
    return this.ventasService.create(createVentaDto, req.usuario);
  }

  @Get()
  @Roles('admin', 'vendedor')
  findAll(@Request() req: any) {
    return this.ventasService.findAll(req.usuario);
  }

  @Get(':id')
  @Roles('admin', 'vendedor')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.ventasService.findOne(+id, req.usuario);
  }

  @Patch(':id')
  @Roles('admin', 'vendedor')
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto, @Request() req: any) {
    return this.ventasService.update(+id, updateVentaDto, req.usuario);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.ventasService.remove(+id, req.usuario);
  }
}
