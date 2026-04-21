import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { rolId, ...datosUsuario } = createUsuarioDto;

    const nuevoUsuario = this.usuarioRepository.create({
      ...datosUsuario,
      rol: { id: rolId }, 
    });

    try {
      const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);
      
      return await this.findOne(usuarioGuardado.id);

    } catch (error) {
      if ((error as any).code === '23505') {
        throw new BadRequestException('El email ya está registrado, Palo.');
      }

      console.error("Error no controlado:", error);
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async findByEmailWithPassword(email: string) {
    return await this.usuarioRepository
      .createQueryBuilder('usuario') 
      .addSelect('usuario.password')  
      .leftJoinAndSelect('usuario.rol', 'rol') 
      .where('usuario.email = :email', { email }) 
      .getOne(); 
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { rolId, ...datosUpdate } = updateUsuarioDto;
    
    const usuario = await this.findOne(id);
    
    const datosParaMezclar = {
      ...datosUpdate,
      ...(rolId && { rol: { id: rolId } })
    };

    this.usuarioRepository.merge(usuario, datosParaMezclar);
    const usuarioActualizado = await this.usuarioRepository.save(usuario);
    
    return await this.findOne(usuarioActualizado.id);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
    return { message: 'Usuario eliminado correctamente' };
  }
}