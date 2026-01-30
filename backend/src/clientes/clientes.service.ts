import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const nuevoCliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(nuevoCliente);
  }

  async findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`Cliente no encontrado`);
    } 
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    const clienteEditado = await this.clienteRepository.merge(cliente, updateClienteDto);
    return await this.clienteRepository.save(clienteEditado);
  }

  async deshabilitar(id: number) {
    const cliente = await this.findOne(id);
    cliente.estado = 'inactivo';
    return await this.clienteRepository.save(cliente);
  }
}
