import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, Cliente]), forwardRef(() => AuthModule)],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
