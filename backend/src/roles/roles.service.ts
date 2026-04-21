import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService implements OnModuleInit {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async onModuleInit() {
    const rolesACrear = ['admin', 'vendedor']; 
    
    for (const nombre of rolesACrear) {
      const existe = await this.rolRepository.findOneBy({ nombre });
      if (!existe) {
        const nuevoRol = this.rolRepository.create({ nombre });
        await this.rolRepository.save(nuevoRol);
        console.log(` Rol "${nombre}" creado.`);
      }
    }
  }

  findAll() {
    return this.rolRepository.find();
  }
}