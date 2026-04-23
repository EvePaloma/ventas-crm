import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache, // <-- Inyectamos Redis
  ) {}

  private obtenerUsuarioId(usuario: any) {
    return usuario?.id ?? usuario?.sub;
  }

  private esAdmin(usuario: any) {
    return usuario?.rol === 'admin';
  }

  private async limpiarCacheCliente(vendedorId: number) {
    await this.cacheManager.del('todos_las_clientes');
    await this.cacheManager.del(`clientes_usuario_${vendedorId}`);
    await this.cacheManager.del('clientes_admin');
  }

  async create(createClienteDto: CreateClienteDto, usuario: any) {
    const vendedorId = usuario.id || usuario.sub;
    
    const nuevoCliente = this.clienteRepository.create({
      ...createClienteDto,
      vendedor: { id: vendedorId } as any,
    });

    const clienteGuardado = await this.clienteRepository.save(nuevoCliente);
    await this.limpiarCacheCliente(vendedorId);
    return clienteGuardado;
  }

  async findAll(usuario: any) {
    const usuarioId = this.obtenerUsuarioId(usuario);
    const cacheKey = this.esAdmin(usuario) ? 'clientes_admin' : `clientes_usuario_${usuarioId}`;

    const clientesCache = await this.cacheManager.get<Cliente[]>(cacheKey);
    if (clientesCache) return clientesCache;

    const clientes = await this.clienteRepository.find({
      where: this.esAdmin(usuario) ? undefined : { vendedor: { id: usuarioId } },
      relations: ['ventas', 'vendedor', 'tareas'],
    });

    await this.cacheManager.set(cacheKey, clientes);
    return clientes;
  }

  async findOne(id: number, usuario: any) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['ventas', 'vendedor', 'tareas'],
    });

    if (!cliente) throw new NotFoundException(`Cliente no encontrado`);
    if (!this.esAdmin(usuario) && cliente.vendedor?.id !== this.obtenerUsuarioId(usuario)) {
      throw new ForbiddenException('No tienes permiso para ver este cliente');
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto, usuario: any) {
    const cliente = await this.findOne(id, usuario);
    const clienteEditado = this.clienteRepository.merge(cliente, updateClienteDto);
    
    const actualizado = await this.clienteRepository.save(clienteEditado);
    await this.limpiarCacheCliente(cliente.vendedor.id);
    return actualizado;
  }

  async deshabilitar(id: number, usuario: any) {
    const cliente = await this.findOne(id, usuario);
    cliente.estado = 'inactivo';
    
    const deshabilitado = await this.clienteRepository.save(cliente);
    await this.limpiarCacheCliente(cliente.vendedor.id);
    return deshabilitado;
  }
}