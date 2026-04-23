import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { RolesGuard } from 'src/auth/guards/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('tareas')
@UseGuards(AuthGuard, RolesGuard)
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  @Roles('admin', 'vendedor')
  create(@Body() createTareaDto: CreateTareaDto, @Req() req) {
    return this.tareasService.create(createTareaDto, req.usuario);
  }

  @Get()
  @Roles('admin', 'vendedor')
  findAll(@Request() req: any) {
    return this.tareasService.findAll(req.usuario);
  }

  @Get(':id')
  @Roles('admin', 'vendedor')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.tareasService.findOne(+id, req.usuario);
  }

  @Patch(':id')
  @Roles('admin', 'vendedor')
  update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto, @Request() req: any) {
    return this.tareasService.update(+id, updateTareaDto, req.usuario);
  }

  @Delete(':id')
  @Roles('admin', 'vendedor')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.tareasService.remove(+id, req.usuario);
  }
}
