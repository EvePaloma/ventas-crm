import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createVentaDto: CreateVentaDto) {
    const cliente = await this.clienteRepository.findOneBy({ id: createVentaDto.clienteId });
    if (!cliente) {
      throw new NotFoundException(`Cliente no encontrado para la venta`);
    }

    const nuevaVenta = this.ventaRepository.create({
      total: createVentaDto.total,
      cliente: cliente,
    });
    return await this.ventaRepository.save(nuevaVenta);
  }

  async findAll() {
    return await this.ventaRepository.find({ 
      relations: ['cliente'] 
    });
  }

  async findOne(id: number) {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
    if (!venta) {
      throw new NotFoundException(`Venta no encontrada`);
    }
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    const venta = await this.findOne(id);
    const ventaEditada = this.ventaRepository.merge(venta, updateVentaDto);
    return this.ventaRepository.save(ventaEditada);
  }

  async remove(id: number) {
    const venta = await this.findOne(id);
    return this.ventaRepository.remove(venta);
  }
}
