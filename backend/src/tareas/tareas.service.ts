import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Cliente } from '../clientes/entities/cliente.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  private obtenerUsuarioId(usuario: any) {
    return usuario?.id ?? usuario?.sub;
  }

  private esAdmin(usuario: any) {
    return usuario?.rol === 'admin';
  }

  private async limpiarCacheTareas(usuarioId: number) {
    await this.cacheManager.del('todas_las_tareas');
    await this.cacheManager.del(`tareas_usuario_${usuarioId}`);
    await this.cacheManager.del('tareas_admin');
  }

  private async obtenerTareaConRelaciones(id: number) {
    return this.tareaRepository.findOne({
      where: { id },
      relations: ['cliente', 'vendedor'],
    });
  }

  async create(createTareaDto: CreateTareaDto, usuario: any) {
    const { clienteId, ...datosTarea } = createTareaDto;
    const vendedorId = usuario.id || usuario.sub;
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
      relations: ['vendedor'],
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado para la tarea');
    }

    if (!this.esAdmin(usuario) && cliente.vendedor?.id !== vendedorId) {
      throw new ForbiddenException('No tienes permiso para crear una tarea para este cliente');
    }

    const nuevaTarea = this.tareaRepository.create({
      ...datosTarea,
      cliente: { id: clienteId } as any,
      vendedor: { id: vendedorId } as any,
    });

    try {
      const tareaGuardada = await this.tareaRepository.save(nuevaTarea);
      await this.limpiarCacheTareas(vendedorId);
      return tareaGuardada;
    } catch (error) {
      throw error; 
    }
  }

  async findAll(usuario: any) {
    const usuarioId = this.obtenerUsuarioId(usuario);
    const cacheKey = this.esAdmin(usuario) ? 'tareas_admin' : `tareas_usuario_${usuarioId}`;

    const tareasCache = await this.cacheManager.get<Tarea[]>(cacheKey);
    if (tareasCache) return tareasCache;

    const tareas = await this.tareaRepository.find({ 
      where: this.esAdmin(usuario) ? undefined : { vendedor: { id: usuarioId } },
      relations: ['cliente', 'vendedor'] 
    });
    
    await this.cacheManager.set(cacheKey, tareas);
    return tareas;
  }

  async findOne(id: number, usuario: any) {
    const tarea = await this.obtenerTareaConRelaciones(id);

    if (!tarea) throw new NotFoundException(`Tarea no encontrada`);
    if (!this.esAdmin(usuario) && tarea.vendedor?.id !== this.obtenerUsuarioId(usuario)) {
      throw new ForbiddenException('No tienes permiso para ver esta tarea');
    }
    return tarea;
  }

  async update(id: number, updateTareaDto: UpdateTareaDto, usuario: any) {
    const tarea = await this.findOne(id, usuario);
    const tareaEditada = this.tareaRepository.merge(tarea, updateTareaDto);
    const tareaActualizada = await this.tareaRepository.save(tareaEditada);
    
    await this.limpiarCacheTareas(tarea.vendedor.id);
    return tareaActualizada;
  }

  async remove(id: number, usuario: any) {
    const tarea = await this.findOne(id, usuario);
    await this.tareaRepository.remove(tarea);
    await this.limpiarCacheTareas(tarea.vendedor.id);
    return { message: 'Tarea eliminada correctamente' };
  }
}