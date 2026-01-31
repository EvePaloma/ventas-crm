import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}


  async create(createTareaDto: CreateTareaDto) {
    const { clienteId, ...datosTarea } = createTareaDto;
    const nuevaTarea = this.tareaRepository.create({
      ...datosTarea,
      cliente: { id: clienteId } as any,
    });
    const tareaGuardada = await this.tareaRepository.save(nuevaTarea);
    await this.cacheManager.del('todas_las_tareas');
    return tareaGuardada;
  }

  async findAll() {
    const tareasCache = await this.cacheManager.get<Tarea[]>('todas_las_tareas');
    if (tareasCache) {
      console.log('Datos de tareas obtenidos de REDIS (caché)');
      return tareasCache;
    }

    console.log('Datos de tareas obtenidos de la BD');
    const tareas =  await this.tareaRepository.find({ relations: ['cliente'] });
    await this.cacheManager.set('todas_las_tareas', tareas);
    return tareas;
  }

  async findOne(id: number) {
    const tarea = await this.tareaRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
    if (!tarea) {
      throw new NotFoundException(`Tarea no encontrada`);
    }
    return tarea;
  }

  async update(id: number, updateTareaDto: UpdateTareaDto) {
    const tarea = await this.findOne(id);
    if (!tarea) {
      throw new NotFoundException(`Tarea no encontrada`);
    }
    const tareaEditada = this.tareaRepository.merge(tarea, updateTareaDto);
    const tareaActualizada = await this.tareaRepository.save(tareaEditada);
    await this.cacheManager.del('todas_las_tareas');
    return tareaActualizada;
  }

  async remove(id: number) {
    const tarea = await this.findOne(id);
    await this.tareaRepository.remove(tarea);
    await this.cacheManager.del('todas_las_tareas');
    return { message: 'Tarea eliminada correctamente' };
  }
}
