import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  private obtenerUsuarioId(usuario: any) {
    return usuario?.id ?? usuario?.sub;
  }

  private esAdmin(usuario: any) {
    return usuario?.rol === 'admin';
  }

  private async obtenerVentaConCliente(id: number) {
    return this.ventaRepository.findOne({
      where: { id },
      relations: ['cliente', 'cliente.vendedor'],
    });
  }

  async create(createVentaDto: CreateVentaDto, usuario: any) {
    const cliente = await this.clienteRepository.findOneBy({ id: createVentaDto.clienteId });
    if (!cliente) {
      throw new NotFoundException(`Cliente no encontrado para la venta`);
    }

    if (!this.esAdmin(usuario) && cliente.vendedor?.id !== this.obtenerUsuarioId(usuario)) {
      throw new ForbiddenException('No tienes permiso para crear una venta para este cliente');
    }

    const nuevaVenta = this.ventaRepository.create({
      total: createVentaDto.total,
      cliente: cliente,
    });
    return await this.ventaRepository.save(nuevaVenta);
  }

  async findAll(usuario: any) {
    const query = this.ventaRepository
      .createQueryBuilder('venta')
      .leftJoinAndSelect('venta.cliente', 'cliente')
      .leftJoinAndSelect('cliente.vendedor', 'vendedor');

    if (!this.esAdmin(usuario)) {
      query.where('vendedor.id = :vendedorId', { vendedorId: this.obtenerUsuarioId(usuario) });
    }

    return await query.getMany();
  }

  async findOne(id: number, usuario: any) {
    const venta = await this.obtenerVentaConCliente(id);
    if (!venta) {
      throw new NotFoundException(`Venta no encontrada`);
    }

    if (!this.esAdmin(usuario) && venta.cliente?.vendedor?.id !== this.obtenerUsuarioId(usuario)) {
      throw new ForbiddenException('No tienes permiso para ver esta venta');
    }
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto, usuario: any) {
    const venta = await this.findOne(id, usuario);
    const ventaEditada = this.ventaRepository.merge(venta, updateVentaDto);
    return this.ventaRepository.save(ventaEditada);
  }

  async remove(id: number, usuario: any) {
    const venta = await this.findOne(id, usuario);
    return this.ventaRepository.remove(venta);
  }
}
