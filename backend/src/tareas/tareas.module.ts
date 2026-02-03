import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { Cliente } from '../clientes/entities/cliente.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarea, Cliente]),
    AuthModule,
    CacheModule.registerAsync({
      useFactory: () => ({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    }),
  ],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
