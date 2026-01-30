import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientesModule } from './clientes/clientes.module';
import { Cliente } from './clientes/entities/cliente.entity';
import { VentasModule } from './ventas/ventas.module';
import { Venta } from './ventas/entities/venta.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'), 
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Cliente, Venta],
      synchronize: true,
    }),
    ClientesModule,
    VentasModule,
  ],
})
export class AppModule {}
