import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { RolesGuard } from 'src/auth/guards/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('clientes')
@UseGuards(AuthGuard, RolesGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @Roles('admin', 'vendedor')
  create(@Body() createClienteDto: CreateClienteDto, @Request() req: any) {
    return this.clientesService.create(createClienteDto, req.usuario);
  }

  @Get()
  @Roles('admin', 'vendedor')
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'vendedor')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin', 'vendedor')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.clientesService.deshabilitar(+id);
  }
}
