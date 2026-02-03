import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('tareas')
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;

    @Column({ default: 'pendiente' })
    estado: string;

    @Column({ type: 'timestamp', nullable: true })
    fechaLimite: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.tareas)
    vendedor: Usuario;

    @ManyToOne(() => Cliente, (cliente) => cliente.tareas)
    cliente: Cliente;
}
