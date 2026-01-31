import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
      const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);
      return usuarioGuardado;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El correo ya está en uso');
      }
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    const usuarioEditado = this.usuarioRepository.merge(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(usuarioEditado);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
    return { message: 'Usuario eliminado correctamente' };
  }
}
