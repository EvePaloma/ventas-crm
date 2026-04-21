import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/role.entity';
import { RolService } from './roles.service';
import { RolController } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  providers: [RolService],
  controllers: [RolController],
  exports: [RolService, TypeOrmModule.forFeature([Rol])], 
})
export class RolModule {}