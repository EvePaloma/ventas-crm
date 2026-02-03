import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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

  async create(createClienteDto: CreateClienteDto, usuario: any) {
    const vendedorId = usuario.id || usuario.sub;
    
    const nuevoCliente = this.clienteRepository.create({
      ...createClienteDto,
      vendedor: { id: vendedorId } as any,
    });

    const clienteGuardado = await this.clienteRepository.save(nuevoCliente);
    // Limpiamos la caché de clientes al crear uno nuevo
    await this.cacheManager.del('todos_las_clientes'); 
    return clienteGuardado;
  }

  async findAll() {
    // Intentamos obtener de Redis
    const clientesCache = await this.cacheManager.get<Cliente[]>('todos_las_clientes');
    if (clientesCache) return clientesCache;

    // Si no está, vamos a la DB
    const clientes = await this.clienteRepository.find({
      relations: ['ventas', 'vendedor', 'tareas'],
    });

    // Guardamos en Redis
    await this.cacheManager.set('todos_las_clientes', clientes);
    return clientes;
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['ventas', 'vendedor', 'tareas'],
    });

    if (!cliente) throw new NotFoundException(`Cliente no encontrado`);
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    const clienteEditado = this.clienteRepository.merge(cliente, updateClienteDto);
    
    const actualizado = await this.clienteRepository.save(clienteEditado);
    await this.cacheManager.del('todos_las_clientes');
    return actualizado;
  }

  async deshabilitar(id: number) {
    const cliente = await this.findOne(id);
    cliente.estado = 'inactivo';
    
    const deshabilitado = await this.clienteRepository.save(cliente);
    await this.cacheManager.del('todos_las_clientes');
    return deshabilitado;
  }
}