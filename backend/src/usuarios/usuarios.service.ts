import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { password, ...datosUsuario } = createUsuarioDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = this.usuarioRepository.create({
      ...datosUsuario,
      password: hashedPassword,
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async findByEmailWhitPassword(email: string) {
    return await this.usuarioRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'rol'], 
    });
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
