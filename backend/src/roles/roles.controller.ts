import { Controller, Get } from '@nestjs/common';
import { RolService } from './roles.service';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  getRoles() {
    return this.rolService.findAll();
  }
}